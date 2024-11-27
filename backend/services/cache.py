"""
Cache Service Module
Provides caching functionality using Redis
"""
from typing import Any, Dict, Optional
import json
import redis
import os

redis_client = redis.Redis(
    host=os.getenv('REDIS_HOST', 'localhost'),
    port=int(os.getenv('REDIS_PORT', 6379)),
    db=0,
    decode_responses=True
)

def cache_metrics(metrics: Dict[str, Any], expiry: int = 300):
    """Cache metrics data with expiry"""
    redis_client.setex('fraud_metrics', expiry, json.dumps(metrics))

def get_cached_metrics() -> Optional[Dict[str, Any]]:
    """Retrieve cached metrics"""
    cached = redis_client.get('fraud_metrics')
    return json.loads(cached) if cached else None

def cache_activity(activity_list: list, expiry: int = 300):
    """Cache activity data with expiry"""
    redis_client.setex('recent_activity', expiry, json.dumps(activity_list))

def get_cached_activity() -> Optional[list]:
    """Retrieve cached activity"""
    cached = redis_client.get('recent_activity')
    return json.loads(cached) if cached else None