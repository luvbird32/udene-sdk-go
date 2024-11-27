from fastapi import FastAPI, HTTPException, Depends, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict, Any
import random
from datetime import datetime
from pydantic import BaseModel
from prometheus_fastapi_instrumentator import Instrumentator
from config.messaging import (
    cache_metrics, get_cached_metrics,
    cache_activity, get_cached_activity,
    publish_event, init_kafka, close_kafka
)
from ml.fraud_detector import detector
from privacy.anonymizer import anonymize_data
from privacy.retention import RetentionManager
from privacy.gdpr import GDPRHandler
from privacy.ccpa import CCPAHandler

app = FastAPI(title="Fraud Detection API")

# Initialize Prometheus metrics
Instrumentator().instrument(app).expose(app)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# TLS 1.3 configuration
ssl_context = {
    "ssl_version": "TLSv1_3",
    "ciphers": "TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256"
}

security = HTTPBearer()
retention_manager = RetentionManager()
gdpr_handler = GDPRHandler()
ccpa_handler = CCPAHandler()

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

class FraudPredictionRequest(BaseModel):
    transaction_amount: float
    merchant_id: str
    customer_id: str
    timestamp: str
    location: str
    device_id: str
    ip_address: str
    transaction_type: str
    card_present: bool
    recurring: bool

@app.post("/api/v1/predict")
async def predict_fraud(
    request: FraudPredictionRequest,
    _: str = Depends(verify_api_key)
):
    """Predict fraud probability for a transaction"""
    features = request.dict()
    prediction = detector.predict_fraud_probability(features)
    
    # Track high-risk predictions
    if prediction['is_fraudulent']:
        await publish_event("fraud_alerts", {
            **features,
            **prediction
        })
    
    return prediction

@app.post("/api/v1/track")
async def track_interaction(request: TrackRequest, _: str = Depends(verify_api_key)):
    # Publish the interaction event to Kafka
    await publish_event("user_interactions", request.dict())
    return {"status": "success"}

@app.get("/api/v1/validate")
async def validate_key(_: str = Depends(verify_api_key)):
    return {"status": "valid"}

class PrivacyRequest(BaseModel):
    requestType: str
    userId: str
    email: str
    region: str

class RetentionPolicy(BaseModel):
    dataType: str
    retentionPeriod: int
    anonymizationEnabled: bool
    region: str

@app.post("/api/v1/privacy/data-request")
async def handle_privacy_request(
    request: PrivacyRequest,
    credentials: HTTPAuthorizationCredentials = Security(security)
):
    verify_api_key(credentials)
    
    if request.region == "EU":
        return await gdpr_handler.process_request(request)
    elif request.region == "California":
        return await ccpa_handler.process_request(request)
    else:
        return await gdpr_handler.process_request(request)  # Default to GDPR-like handling

@app.put("/api/v1/privacy/retention-policy")
async def update_retention_policy(
    policy: RetentionPolicy,
    credentials: HTTPAuthorizationCredentials = Security(security)
):
    verify_api_key(credentials)
    return await retention_manager.update_policy(policy)

# Middleware for data anonymization
@app.middleware("http")
async def anonymize_response_data(request, call_next):
    response = await call_next(request)
    if "application/json" in response.headers.get("content-type", ""):
        response.body = anonymize_data(response.body)
    return response

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, ssl_context=ssl_context)
