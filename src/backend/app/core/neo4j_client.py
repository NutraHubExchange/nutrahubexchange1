"""
Neo4j client for ontology operations
"""
from neo4j import GraphDatabase, Driver
from app.core.config import settings
from typing import List, Dict, Optional, Any
from loguru import logger


class Neo4jClient:
    """Neo4j client wrapper for ontology operations"""
    
    def __init__(self):
        self.driver: Optional[Driver] = None
    
    def connect(self):
        """Connect to Neo4j"""
        if not self.driver:
            self.driver = GraphDatabase.driver(
                settings.NEO4J_URI,
                auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)
            )
            logger.info("✅ Neo4j connected")
    
    def close(self):
        """Close Neo4j connection"""
        if self.driver:
            self.driver.close()
            logger.info("👋 Neo4j connection closed")
    
    def verify_connectivity(self):
        """Verify Neo4j connectivity"""
        if not self.driver:
            self.connect()
        self.driver.verify_connectivity()
    
    def execute_query(
        self, 
        query: str, 
        parameters: Optional[Dict[str, Any]] = None
    ) -> List[Dict]:
        """Execute Cypher query and return results"""
        if not self.driver:
            self.connect()
        
        with self.driver.session() as session:
            result = session.run(query, parameters or {})
            return [record.data() for record in result]
    
    def find_ingredient_by_name(self, name: str) -> Optional[Dict]:
        """Find ingredient by exact name"""
        query = """
        MATCH (i:Ingredient {name: $name})
        RETURN i
        """
        results = self.execute_query(query, {"name": name})
        return results[0]["i"] if results else None
    
    def find_ingredient_by_synonym(
        self, 
        text: str,
        min_confidence: float = 0.7
    ) -> List[Dict]:
        """Find ingredients by synonym with confidence threshold"""
        query = """
        MATCH (s:Synonym)-[:REFERS_TO]->(i:Ingredient)
        WHERE toLower(s.normalized) CONTAINS toLower($text)
          AND s.confidence >= $min_confidence
        RETURN i, s.confidence as match_confidence, s.text as matched_synonym
        ORDER BY s.confidence DESC
        LIMIT 10
        """
        return self.execute_query(query, {
            "text": text,
            "min_confidence": min_confidence
        })
    
    def fuzzy_search_ingredient(
        self, 
        search_term: str,
        max_distance: int = 3
    ) -> List[Dict]:
        """Fuzzy search for ingredients using Levenshtein distance"""
        # Note: Requires APOC plugin
        query = """
        MATCH (s:Synonym)
        WITH s, apoc.text.levenshteinDistance(toLower(s.normalized), toLower($search_term)) as distance
        WHERE distance <= $max_distance
        MATCH (s)-[:REFERS_TO]->(i:Ingredient)
        RETURN i, s.text as matched_text, distance
        ORDER BY distance, s.confidence DESC
        LIMIT 5
        """
        try:
            return self.execute_query(query, {
                "search_term": search_term,
                "max_distance": max_distance
            })
        except Exception as e:
            logger.warning(f"Fuzzy search failed (APOC may not be installed): {e}")
            # Fallback to contains search
            return self.find_ingredient_by_synonym(search_term)
    
    def get_ingredient_grades(self, ingredient_name: str) -> List[Dict]:
        """Get available grades for an ingredient"""
        query = """
        MATCH (i:Ingredient {name: $ingredient_name})-[:AVAILABLE_IN_GRADE]->(g:Grade)
        RETURN g
        """
        return self.execute_query(query, {"ingredient_name": ingredient_name})
    
    def get_ingredient_forms(self, ingredient_name: str) -> List[Dict]:
        """Get available forms for an ingredient"""
        query = """
        MATCH (i:Ingredient {name: $ingredient_name})-[:AVAILABLE_IN_FORM]->(f:Form)
        RETURN f
        """
        return self.execute_query(query, {"ingredient_name": ingredient_name})
    
    def find_substitutes(
        self,
        ingredient_name: str,
        min_similarity: float = 0.7
    ) -> List[Dict]:
        """Find substitute ingredients"""
        query = """
        MATCH (i:Ingredient {name: $ingredient_name})-[r:CAN_SUBSTITUTE]->(sub:Ingredient)
        WHERE r.similarity >= $min_similarity
        RETURN sub, r.similarity, r.conditions
        ORDER BY r.similarity DESC
        """
        return self.execute_query(query, {
            "ingredient_name": ingredient_name,
            "min_similarity": min_similarity
        })
    
    def get_required_certifications(
        self,
        ingredient_name: str,
        grade: str
    ) -> List[Dict]:
        """Get required certifications for ingredient and grade"""
        query = """
        MATCH (i:Ingredient {name: $ingredient_name})-[:AVAILABLE_IN_GRADE]->(g:Grade {name: $grade})
        MATCH (g)-[:REQUIRES_CERTIFICATION]->(c:Certification)
        RETURN c
        """
        return self.execute_query(query, {
            "ingredient_name": ingredient_name,
            "grade": grade
        })
    
    def create_ingredient(self, ingredient_data: Dict) -> Dict:
        """Create a new ingredient node"""
        query = """
        CREATE (i:Ingredient {
            id: $id,
            name: $name,
            botanical_name: $botanical_name,
            cas_number: $cas_number,
            category: $category,
            description: $description,
            created_at: datetime()
        })
        RETURN i
        """
        results = self.execute_query(query, ingredient_data)
        return results[0]["i"] if results else None
    
    def add_synonym(
        self,
        ingredient_name: str,
        synonym_text: str,
        normalized: str,
        confidence: float = 1.0
    ) -> bool:
        """Add a synonym to an ingredient"""
        query = """
        MATCH (i:Ingredient {name: $ingredient_name})
        CREATE (s:Synonym {
            text: $synonym_text,
            normalized: $normalized,
            confidence: $confidence
        })
        CREATE (i)-[:HAS_SYNONYM {confidence: $confidence}]->(s)
        CREATE (s)-[:REFERS_TO]->(i)
        RETURN s
        """
        results = self.execute_query(query, {
            "ingredient_name": ingredient_name,
            "synonym_text": synonym_text,
            "normalized": normalized,
            "confidence": confidence
        })
        return len(results) > 0
    
    def normalize_ingredient_name(
        self,
        raw_text: str
    ) -> Optional[Dict]:
        """
        Normalize ingredient name using ontology.
        Returns best match with confidence score.
        """
        # Try exact match first
        exact = self.find_ingredient_by_name(raw_text)
        if exact:
            return {
                "ingredient": exact,
                "confidence": 1.0,
                "match_type": "exact"
            }
        
        # Try synonym match
        synonym_matches = self.find_ingredient_by_synonym(raw_text, min_confidence=0.7)
        if synonym_matches:
            best_match = synonym_matches[0]
            return {
                "ingredient": best_match["i"],
                "confidence": best_match["match_confidence"],
                "match_type": "synonym",
                "matched_text": best_match["matched_synonym"]
            }
        
        # Try fuzzy search
        fuzzy_matches = self.fuzzy_search_ingredient(raw_text)
        if fuzzy_matches:
            best_match = fuzzy_matches[0]
            return {
                "ingredient": best_match["i"],
                "confidence": max(0.5, 1.0 - (best_match["distance"] / 10)),
                "match_type": "fuzzy",
                "matched_text": best_match["matched_text"]
            }
        
        return None


# Global Neo4j client instance
neo4j_driver = Neo4jClient()
