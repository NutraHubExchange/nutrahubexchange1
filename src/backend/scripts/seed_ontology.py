"""
Seed Neo4j ontology with ingredient data
"""
import sys
import os
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.core.neo4j_client import neo4j_driver
from loguru import logger


def seed_ontology():
    """Seed Neo4j with ingredient ontology data"""
    
    logger.info("Starting Neo4j ontology seeding...")
    
    # Read Cypher file
    cypher_file = os.path.join(os.path.dirname(__file__), '..', 'db', 'neo4j_ontology.cypher')
    
    with open(cypher_file, 'r') as f:
        cypher_content = f.read()
    
    # Split by CREATE statements and execute
    statements = []
    current = []
    
    for line in cypher_content.split('\n'):
        line = line.strip()
        
        # Skip comments and empty lines
        if line.startswith('//') or not line:
            continue
        
        # Skip constraint and index creation (handle separately)
        if line.startswith('CREATE CONSTRAINT') or line.startswith('CREATE INDEX'):
            statements.append(line)
            continue
        
        current.append(line)
        
        # If line ends with semicolon, it's a complete statement
        if line.endswith(';'):
            statements.append(' '.join(current))
            current = []
    
    # Add any remaining statement
    if current:
        statements.append(' '.join(current))
    
    logger.info(f"Found {len(statements)} statements to execute")
    
    # Execute statements
    success_count = 0
    for i, statement in enumerate(statements, 1):
        try:
            if statement.strip():
                neo4j_driver.execute_query(statement)
                success_count += 1
                logger.info(f"✓ Executed statement {i}/{len(statements)}")
        except Exception as e:
            logger.warning(f"⚠ Statement {i} failed (might already exist): {str(e)[:100]}")
    
    logger.info(f"✅ Ontology seeding complete: {success_count}/{len(statements)} statements succeeded")
    
    # Verify data
    try:
        result = neo4j_driver.execute_query("MATCH (n:Ingredient) RETURN count(n) as count")
        ingredient_count = result[0]['count'] if result else 0
        logger.info(f"📊 Total ingredients in database: {ingredient_count}")
    except Exception as e:
        logger.error(f"Could not verify data: {e}")


if __name__ == "__main__":
    try:
        neo4j_driver.connect()
        seed_ontology()
        neo4j_driver.close()
    except Exception as e:
        logger.error(f"Failed to seed ontology: {e}")
        sys.exit(1)
