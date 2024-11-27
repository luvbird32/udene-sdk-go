"""
Messaging Configuration Module
Configures and manages Redis caching and Kafka messaging services.
"""
import json
from redis import Redis
from aiokafka import AIOKafkaProducer
import asyncio
from typing import Any, Dict
import os

# Redis client configuration for caching
redis_client = Redis(
    host=os.getenv('REDIS_HOST', 'localhost'),
    port=int(os.getenv('REDIS_PORT', 6379)),
    db=0,
    decode_responses=True
)

# Kafka configuration for event streaming
kafka_bootstrap_servers = os.getenv('KAFKA_BOOTSTRAP_SERVERS', 'localhost:9092')
kafka_producer = None

async def init_kafka():
    """Initialize Kafka producer connection"""
    global kafka_producer
    kafka_producer = AIOKafkaProducer(
        bootstrap_servers=kafka_bootstrap_servers
    )
    await kafka_producer.start()

async def close_kafka():
    """Close Kafka producer connection"""
    if kafka_producer:
        await kafka_producer.stop()

# Redis Helper Functions
def cache_metrics(metrics: Dict[str, Any], expiry: int = 300):
    """
    Cache metrics data with a default 5-minute expiry
    
    Args:
        metrics: Dictionary containing metrics data
        expiry: Cache expiry time in seconds
    """
    redis_client.setex('fraud_metrics', expiry, json.dumps(metrics))

def get_cached_metrics() -> Dict[str, Any]:
    """
    Retrieve cached metrics data
    
    Returns:
        Dict containing cached metrics or None if not found
    """
    cached = redis_client.get('fraud_metrics')
    return json.loads(cached) if cached else None

def cache_activity(activity_list: list, expiry: int = 300):
    """
    Cache recent activity data
    
    Args:
        activity_list: List of recent activities
        expiry: Cache expiry time in seconds
    """
    redis_client.setex('recent_activity', expiry, json.dumps(activity_list))

def get_cached_activity() -> list:
    """
    Retrieve cached activity data
    
    Returns:
        List of cached activities or None if not found
    """
    cached = redis_client.get('recent_activity')
    return json.loads(cached) if cached else None

# Kafka Helper Functions
async def publish_event(topic: str, data: Dict[str, Any]):
    """
    Publish event to Kafka topic
    
    Args:
        topic: Kafka topic name
        data: Event data to publish
    """
    if kafka_producer:
        try:
            value_json = json.dumps(data).encode('utf-8')
            await kafka_producer.send_and_wait(topic, value_json)
        except Exception as e:
            print(f"Error publishing to Kafka: {e}")