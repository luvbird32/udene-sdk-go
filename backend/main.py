from fastapi import FastAPI, HTTPException, Depends, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import random
from datetime import datetime
from pydantic import BaseModel
from config.messaging import (
    cache_metrics, get_cached_metrics,
    cache_activity, get_cached_activity,
    publish_event, init_kafka, close_kafka
)

app = FastAPI(title="Fraud Detection API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()

# Mock database (replace with real database in production)
API_KEYS = {"your_api_key_here"}

class FraudMetrics(BaseModel):
    riskScore: float
    activeUsers: int
    alertCount: int
    apiCalls: int
    accuracy: float
    falsePositiveRate: float
    avgProcessingTime: float
    concurrentCalls: int

class Activity(BaseModel):
    id: str
    type: str
    description: str
    timestamp: str

class TrackRequest(BaseModel):
    userId: str
    action: str
    timestamp: str
    metadata: dict

def verify_api_key(credentials: HTTPAuthorizationCredentials = Security(security)):
    if credentials.credentials not in API_KEYS:
        raise HTTPException(
            status_code=401,
            detail="Invalid API key"
        )
    return credentials.credentials

@app.on_event("startup")
async def startup_event():
    await init_kafka()

@app.on_event("shutdown")
async def shutdown_event():
    await close_kafka()

@app.get("/api/v1/metrics", response_model=FraudMetrics)
async def get_metrics(_: str = Depends(verify_api_key)):
    # Try to get metrics from cache first
    cached_metrics = get_cached_metrics()
    if cached_metrics:
        return cached_metrics

    # If not in cache, generate metrics (replace with real data in production)
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
    
    # Cache the metrics
    cache_metrics(metrics)
    return metrics

@app.get("/api/v1/activity", response_model=List[Activity])
async def get_activity(_: str = Depends(verify_api_key)):
    # Try to get activity from cache first
    cached_activity = get_cached_activity()
    if cached_activity:
        return cached_activity

    # If not in cache, generate activity (replace with real data in production)
    activities = []
    for i in range(5):
        activities.append({
            "id": f"act_{i}",
            "type": "suspicious" if random.random() > 0.5 else "normal",
            "description": f"User activity detected {'(suspicious)' if random.random() > 0.5 else '(normal)'}",
            "timestamp": datetime.now().isoformat()
        })
    
    # Cache the activity
    cache_activity(activities)
    return activities

@app.post("/api/v1/track")
async def track_interaction(request: TrackRequest, _: str = Depends(verify_api_key)):
    # Publish the interaction event to Kafka
    await publish_event("user_interactions", request.dict())
    return {"status": "success"}

@app.get("/api/v1/validate")
async def validate_key(_: str = Depends(verify_api_key)):
    return {"status": "valid"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)