"""
Redis client for caching and real-time operations
"""
import redis.asyncio as redis
from app.core.config import settings
from typing import Optional, Any
import json
from loguru import logger


class RedisClient:
    """Redis client wrapper with helper methods"""
    
    def __init__(self):
        self.redis: Optional[redis.Redis] = None
    
    async def connect(self):
        """Connect to Redis"""
        if not self.redis:
            self.redis = await redis.from_url(
                settings.REDIS_URL,
                encoding="utf-8",
                decode_responses=True
            )
            logger.info("✅ Redis connected")
    
    async def close(self):
        """Close Redis connection"""
        if self.redis:
            await self.redis.close()
            logger.info("👋 Redis connection closed")
    
    async def ping(self) -> bool:
        """Test Redis connection"""
        if not self.redis:
            await self.connect()
        return await self.redis.ping()
    
    async def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        if not self.redis:
            await self.connect()
        
        value = await self.redis.get(key)
        if value:
            try:
                return json.loads(value)
            except json.JSONDecodeError:
                return value
        return None
    
    async def set(
        self, 
        key: str, 
        value: Any, 
        expire: Optional[int] = None
    ) -> bool:
        """Set value in cache with optional expiration (seconds)"""
        if not self.redis:
            await self.connect()
        
        if isinstance(value, (dict, list)):
            value = json.dumps(value)
        
        return await self.redis.set(key, value, ex=expire)
    
    async def delete(self, *keys: str) -> int:
        """Delete keys from cache"""
        if not self.redis:
            await self.connect()
        return await self.redis.delete(*keys)
    
    async def exists(self, key: str) -> bool:
        """Check if key exists"""
        if not self.redis:
            await self.connect()
        return await self.redis.exists(key) > 0
    
    async def increment(self, key: str, amount: int = 1) -> int:
        """Increment counter"""
        if not self.redis:
            await self.connect()
        return await self.redis.incrby(key, amount)
    
    async def expire(self, key: str, seconds: int) -> bool:
        """Set expiration on key"""
        if not self.redis:
            await self.connect()
        return await self.redis.expire(key, seconds)
    
    async def add_to_set(self, key: str, *values: str) -> int:
        """Add values to set"""
        if not self.redis:
            await self.connect()
        return await self.redis.sadd(key, *values)
    
    async def get_set_members(self, key: str) -> set:
        """Get all members of a set"""
        if not self.redis:
            await self.connect()
        return await self.redis.smembers(key)
    
    async def publish(self, channel: str, message: Any) -> int:
        """Publish message to channel"""
        if not self.redis:
            await self.connect()
        
        if isinstance(message, (dict, list)):
            message = json.dumps(message)
        
        return await self.redis.publish(channel, message)
    
    async def cache_rfq_matches(
        self, 
        rfq_id: str, 
        matches: list, 
        expire: int = 3600
    ):
        """Cache RFQ matches"""
        key = f"rfq:matches:{rfq_id}"
        await self.set(key, matches, expire=expire)
    
    async def get_rfq_matches(self, rfq_id: str) -> Optional[list]:
        """Get cached RFQ matches"""
        key = f"rfq:matches:{rfq_id}"
        return await self.get(key)
    
    async def cache_seller_score(
        self,
        seller_id: str,
        score_data: dict,
        expire: int = 86400  # 24 hours
    ):
        """Cache seller quality score"""
        key = f"seller:score:{seller_id}"
        await self.set(key, score_data, expire=expire)
    
    async def get_seller_score(self, seller_id: str) -> Optional[dict]:
        """Get cached seller score"""
        key = f"seller:score:{seller_id}"
        return await self.get(key)


# Global Redis client instance
redis_client = RedisClient()
