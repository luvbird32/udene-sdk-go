from fastapi import APIRouter, Depends
from typing import Dict, Any
import random
from datetime import datetime
from ..auth.dependencies import verify_api_key
from ..models.metrics import FraudMetrics, Activity
from ..services.cache import cache_metrics, get_cached_metrics, cache_activity, get_cached_activity

router = APIRouter(prefix="/api/v1")

@router.get("/metrics", response_model=FraudMetrics)
async def get_metrics(_: str = Depends(verify_api_key)):
    cached_metrics = get_cached_metrics()
    if cached_metrics:
        return cached_metrics

    metrics = {
        "riskScore": random.uniform(0, 100),
        "activeUsers": random.randint(500, 1500),
        "alertCount": random.randint(0, 10),
        "apiCalls": random.randint(5000, 15000),
        "accuracy": 97.5,
        "falsePositiveRate": 1.5,
        "avgProcessingTime": 35,
        "concurrentCalls": random.randint(10000, 15000)
    }
    
    cache_metrics(metrics)
    return metrics

@router.get("/activity")
async def get_activity(_: str = Depends(verify_api_key)):
    cached_activity = get_cached_activity()
    if cached_activity:
        return cached_activity

    activities = []
    for i in range(5):
        activities.append({
            "id": f"act_{i}",
            "type": "suspicious" if random.random() > 0.5 else "normal",
            "description": f"User activity detected {'(suspicious)' if random.random() > 0.5 else '(normal)'}",
            "timestamp": datetime.now().isoformat()
        })
    
    cache_activity(activities)
    return activities