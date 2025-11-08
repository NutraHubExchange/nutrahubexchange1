"""
NLP-based Specification Parser
Uses transformer models to extract structured data from raw RFQ text
"""
import re
from typing import Dict, Optional, List
from loguru import logger
import asyncio

# For production: use transformers
# from transformers import pipeline, AutoTokenizer, AutoModelForTokenClassification

from app.core.neo4j_client import neo4j_driver


class SpecParser:
    """
    Parse raw RFQ specifications into structured data
    
    Extracts:
    - Ingredient name
    - Assay/purity percentage
    - Grade (USP, BP, Food Grade, etc.)
    - Form (Powder, Extract, Oil, etc.)
    - Certifications required (GMP, Organic, Halal, etc.)
    - Incoterms
    - MOQ
    """
    
    def __init__(self):
        # In production, load pre-trained NER model
        # self.ner_model = pipeline("ner", model="path/to/model")
        # self.tokenizer = AutoTokenizer.from_pretrained("distilbert-base-uncased")
        pass
    
    async def parse(self, raw_text: str) -> Dict:
        """
        Parse raw specification text
        
        Example input:
        "Need 1000kg of Curcumin 95% USP grade powder, GMP certified, CIF Los Angeles"
        
        Output:
        {
            "ingredient": "Curcumin",
            "botanical_name": "Curcuma longa",
            "assay_min": 95.0,
            "grade": "USP",
            "form": "Powder",
            "certifications_required": ["GMP"],
            "incoterm": "CIF",
            "delivery_location": "Los Angeles"
        }
        """
        
        # Normalize text
        text = raw_text.lower().strip()
        
        parsed = {}
        
        # Extract ingredient name using ontology
        ingredient_match = await self._extract_ingredient(text)
        if ingredient_match:
            parsed.update(ingredient_match)
        
        # Extract assay/purity
        assay = self._extract_assay(text)
        if assay:
            parsed["assay_min"] = assay
        
        # Extract grade
        grade = self._extract_grade(text)
        if grade:
            parsed["grade"] = grade
        
        # Extract form
        form = self._extract_form(text)
        if form:
            parsed["form"] = form
        
        # Extract certifications
        certs = self._extract_certifications(text)
        if certs:
            parsed["certifications_required"] = certs
        
        # Extract incoterm
        incoterm = self._extract_incoterm(text)
        if incoterm:
            parsed["incoterm"] = incoterm
        
        # Extract MOQ
        moq = self._extract_moq(text)
        if moq:
            parsed["moq_kg"] = moq
        
        # Extract mesh size
        mesh = self._extract_mesh(text)
        if mesh:
            parsed["mesh_size"] = mesh
        
        logger.info(f"Parsed specification: {parsed}")
        
        return parsed
    
    async def _extract_ingredient(self, text: str) -> Optional[Dict]:
        """Extract ingredient name using Neo4j ontology"""
        
        # Common ingredient patterns
        patterns = [
            r"(?:curcumin|turmeric)",
            r"(?:ashwagandha|withania)",
            r"(?:vitamin\s*c|ascorbic\s*acid)",
            r"(?:omega[- ]?3|fish\s*oil)",
            r"(?:whey\s*protein|wpi)",
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                ingredient_text = match.group(0)
                
                # Look up in ontology
                result = neo4j_driver.normalize_ingredient_name(ingredient_text)
                if result:
                    ing = result["ingredient"]
                    return {
                        "ingredient": ing["name"],
                        "botanical_name": ing.get("botanical_name"),
                        "cas_number": ing.get("cas_number"),
                        "ontology_confidence": result["confidence"]
                    }
        
        # Fallback: extract first noun phrase
        # In production, use spaCy or similar
        words = text.split()
        if len(words) > 0:
            return {"ingredient": words[0].title()}
        
        return None
    
    def _extract_assay(self, text: str) -> Optional[float]:
        """Extract assay/purity percentage"""
        patterns = [
            r"(\d+(?:\.\d+)?)\s*%",  # 95%
            r"(\d+(?:\.\d+)?)\s*percent",  # 95 percent
            r"purity\s*[:-]?\s*(\d+(?:\.\d+)?)",  # purity: 95
            r"assay\s*[:-]?\s*(\d+(?:\.\d+)?)",  # assay: 95
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                value = float(match.group(1))
                if 50 <= value <= 100:  # Reasonable range
                    return value
        
        return None
    
    def _extract_grade(self, text: str) -> Optional[str]:
        """Extract grade (USP, BP, EP, Food Grade, etc.)"""
        grades = {
            r"\busp\b": "USP",
            r"\bbp\b": "BP",
            r"\bep\b": "EP",
            r"\bjp\b": "JP",
            r"food\s*grade": "Food Grade",
            r"pharmaceutical\s*grade": "Pharmaceutical Grade",
            r"cosmetic\s*grade": "Cosmetic Grade",
            r"technical\s*grade": "Technical Grade",
        }
        
        for pattern, grade_name in grades.items():
            if re.search(pattern, text, re.IGNORECASE):
                return grade_name
        
        return None
    
    def _extract_form(self, text: str) -> Optional[str]:
        """Extract physical form"""
        forms = {
            r"\bpowder\b": "Powder",
            r"\bextract\b": "Extract",
            r"\boil\b": "Oil",
            r"\bliquid\b": "Liquid",
            r"\bgranules?\b": "Granules",
            r"\bcrystals?\b": "Crystals",
            r"\bpellets?\b": "Pellets",
        }
        
        for pattern, form_name in forms.items():
            if re.search(pattern, text, re.IGNORECASE):
                return form_name
        
        return None
    
    def _extract_certifications(self, text: str) -> List[str]:
        """Extract required certifications"""
        certs = []
        
        cert_patterns = {
            r"\bgmp\b": "GMP",
            r"\biso\s*9001\b": "ISO9001",
            r"\biso\s*22000\b": "ISO22000",
            r"\bhaccp\b": "HACCP",
            r"\bhalal\b": "Halal",
            r"\bkosher\b": "Kosher",
            r"\borganic\b": "Organic",
            r"\busda\s*organic\b": "USDA Organic",
            r"\beu\s*organic\b": "EU Organic",
            r"\bnon[- ]?gmo\b": "Non-GMO",
        }
        
        for pattern, cert_name in cert_patterns.items():
            if re.search(pattern, text, re.IGNORECASE):
                certs.append(cert_name)
        
        return certs
    
    def _extract_incoterm(self, text: str) -> Optional[str]:
        """Extract Incoterm"""
        incoterms = ["EXW", "FCA", "CPT", "CIP", "DAP", "DPU", "DDP", "FAS", "FOB", "CFR", "CIF"]
        
        for term in incoterms:
            if re.search(rf"\b{term}\b", text, re.IGNORECASE):
                return term.upper()
        
        return None
    
    def _extract_moq(self, text: str) -> Optional[float]:
        """Extract Minimum Order Quantity in kg"""
        patterns = [
            r"moq\s*[:-]?\s*(\d+(?:\.\d+)?)\s*(?:kg|kgs)?",
            r"minimum\s*(?:order)?\s*(?:quantity)?\s*[:-]?\s*(\d+(?:\.\d+)?)\s*(?:kg|kgs)?",
        ]
        
        for pattern in patterns:
            match = re.search(pattern, text, re.IGNORECASE)
            if match:
                return float(match.group(1))
        
        return None
    
    def _extract_mesh(self, text: str) -> Optional[str]:
        """Extract mesh size"""
        pattern = r"(\d+)\s*mesh"
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            return f"{match.group(1)} mesh"
        
        return None


# For production transformer-based NER:
"""
class TransformerSpecParser:
    def __init__(self, model_path: str):
        self.tokenizer = AutoTokenizer.from_pretrained(model_path)
        self.model = AutoModelForTokenClassification.from_pretrained(model_path)
        self.ner_pipeline = pipeline(
            "ner",
            model=self.model,
            tokenizer=self.tokenizer,
            aggregation_strategy="simple"
        )
    
    async def parse(self, text: str) -> Dict:
        # Run NER
        entities = self.ner_pipeline(text)
        
        # Map entities to structured fields
        parsed = {}
        for entity in entities:
            if entity["entity_group"] == "INGREDIENT":
                parsed["ingredient"] = entity["word"]
            elif entity["entity_group"] == "ASSAY":
                parsed["assay_min"] = float(re.search(r"\d+", entity["word"]).group())
            # ... more mappings
        
        return parsed
"""
