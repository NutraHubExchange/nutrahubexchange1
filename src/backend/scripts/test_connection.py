"""
Test all service connections
"""
import sys
import os
import asyncio
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.core.config import settings
from app.core.redis_client import redis_client
from app.core.neo4j_client import neo4j_driver
from loguru import logger
import httpx


async def test_connections():
    """Test connections to all services"""
    
    print("=" * 60)
    print("NUTRASENSE AI - CONNECTION TEST")
    print("=" * 60)
    
    results = {
        "PostgreSQL": False,
        "Neo4j": False,
        "Redis": False,
        "API": False
    }
    
    # Test PostgreSQL
    print("\n[1/4] Testing PostgreSQL connection...")
    try:
        from sqlalchemy import create_engine, text
        engine = create_engine(settings.DATABASE_URL.replace('+asyncpg', ''))
        with engine.connect() as conn:
            result = conn.execute(text("SELECT 1"))
            result.fetchone()
        print("✅ PostgreSQL: Connected")
        results["PostgreSQL"] = True
    except Exception as e:
        print(f"❌ PostgreSQL: Failed - {e}")
    
    # Test Neo4j
    print("\n[2/4] Testing Neo4j connection...")
    try:
        neo4j_driver.connect()
        neo4j_driver.verify_connectivity()
        result = neo4j_driver.execute_query("RETURN 1 as test")
        print("✅ Neo4j: Connected")
        results["Neo4j"] = True
        neo4j_driver.close()
    except Exception as e:
        print(f"❌ Neo4j: Failed - {e}")
    
    # Test Redis
    print("\n[3/4] Testing Redis connection...")
    try:
        await redis_client.connect()
        pong = await redis_client.ping()
        if pong:
            print("✅ Redis: Connected")
            results["Redis"] = True
        await redis_client.close()
    except Exception as e:
        print(f"❌ Redis: Failed - {e}")
    
    # Test API
    print("\n[4/4] Testing API endpoint...")
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get("http://localhost:8000/health", timeout=5.0)
            if response.status_code == 200:
                print("✅ API: Running")
                print(f"   Response: {response.json()}")
                results["API"] = True
    except Exception as e:
        print(f"❌ API: Not running - {e}")
        print("   Tip: Start API with: uvicorn app.main:app --reload")
    
    # Summary
    print("\n" + "=" * 60)
    print("CONNECTION SUMMARY")
    print("=" * 60)
    
    for service, status in results.items():
        icon = "✅" if status else "❌"
        print(f"{icon} {service}: {'OK' if status else 'FAILED'}")
    
    all_ok = all(results.values())
    
    if all_ok:
        print("\n🎉 All services are running! You're ready to test.")
    else:
        print("\n⚠️  Some services are not running. See docker-compose.yml")
        print("   Run: docker-compose up -d")
    
    print("=" * 60)
    
    return all_ok


if __name__ == "__main__":
    try:
        result = asyncio.run(test_connections())
        sys.exit(0 if result else 1)
    except KeyboardInterrupt:
        print("\n\nTest interrupted")
        sys.exit(1)
