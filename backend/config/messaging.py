import json
from redis import Redis
from aiokafka import AIOKafkaProducer
import asyncio
from typing import Any, Dict
import os

# Redis Configuration
redis_client = Redis(
    host=os.getenv('REDIS_HOST', 'localhost'),
    port=int(os.getenv('REDIS_PORT', 6379)),
    db=0,
    decode_responses=True
)

# Kafka Configuration
kafka_bootstrap_servers = os.getenv('KAFKA_BOOTSTRAP_SERVERS', 'localhost:9092')
kafka_producer = None

async def init_kafka():
    global kafka_producer
    kafka_producer = AIOKafkaProducer(
        bootstrap_servers=kafka_bootstrap_servers
    )
    await kafka_producer.start()

async def close_kafka():
    if kafka_producer:
        await kafka_producer.stop()

# Redis Helper Functions
def cache_metrics(metrics: Dict[str, Any], expiry: int = 300):
    """Cache metrics data with a 5-minute expiry by default"""
    redis_client.setex('fraud_metrics', expiry, json.dumps(metrics))

def get_cached_metrics() -> Dict[str, Any]:
    """Retrieve cached metrics data"""
    cached = redis_client.get('fraud_metrics')
    return json.loads(cached) if cached else None

def cache_activity(activity_list: list, expiry: int = 300):
    """Cache recent activity data"""
    redis_client.setex('recent_activity', expiry, json.dumps(activity_list))

def get_cached_activity() -> list:
    """Retrieve cached activity data"""
    cached = redis_client.get('recent_activity')
    return json.loads(cached) if cached else None

# Kafka Helper Functions
async def publish_event(topic: str, data: Dict[str, Any]):
    """Publish event to Kafka topic"""
    if kafka_producer:
        try:
            value_json = json.dumps(data).encode('utf-8')
            await kafka_producer.send_and_wait(topic, value_json)
        except Exception as e:
            print(f"Error publishing to Kafka: {e}")