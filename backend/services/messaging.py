"""
Messaging Service Module
Handles Kafka messaging for event streaming
"""
import json
from typing import Any, Dict
import os
from aiokafka import AIOKafkaProducer

kafka_bootstrap_servers = os.getenv('KAFKA_BOOTSTRAP_SERVERS', 'localhost:9092')
kafka_producer = None

async def init_kafka():
    """Initialize Kafka producer"""
    global kafka_producer
    kafka_producer = AIOKafkaProducer(
        bootstrap_servers=kafka_bootstrap_servers
    )
    await kafka_producer.start()

async def close_kafka():
    """Close Kafka producer"""
    if kafka_producer:
        await kafka_producer.stop()

async def publish_event(topic: str, data: Dict[str, Any]):
    """Publish event to Kafka topic"""
    if kafka_producer:
        try:
            value_json = json.dumps(data).encode('utf-8')
            await kafka_producer.send_and_wait(topic, value_json)
        except Exception as e:
            print(f"Error publishing to Kafka: {e}")