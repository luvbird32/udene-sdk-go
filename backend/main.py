from fastapi import FastAPI, HTTPException, Depends, Security, WebSocket, WebSocketDisconnect
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from ml.ensemble_detector import EnsembleDetector
from config.messaging import cache_metrics, get_cached_metrics, cache_activity, get_cached_activity, publish_event
from privacy.anonymizer import anonymize_data
from typing import Dict, Any, List
from datetime import datetime
import json
import asyncio
import logging
import prometheus_client
from prometheus_client import Counter, Histogram, Gauge
import time

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Prometheus metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests')
REQUEST_LATENCY = Histogram('http_request_duration_seconds', 'HTTP request latency')
ACTIVE_USERS = Gauge('active_users', 'Number of active users')
ERROR_COUNT = Counter('error_count', 'Number of errors')

app = FastAPI(title="Fraud Detection API")
detector = EnsembleDetector()

# Initialize Prometheus metrics
Instrumentator().instrument(app).expose(app)

# CORS and security configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

security = HTTPBearer()
API_KEYS = {"your_api_key_here"}

# WebSocket connections store
active_connections: List[WebSocket] = []

async def notify_clients(message: dict):
    """Send updates to all connected WebSocket clients"""
    for connection in active_connections:
        try:
            await connection.send_json(message)
        except WebSocketDisconnect:
            active_connections.remove(connection)

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            try:
                # Keep connection alive and handle incoming messages
                data = await websocket.receive_text()
                # Process any incoming WebSocket messages here
                await websocket.send_json({"status": "received", "data": data})
            except WebSocketDisconnect:
                active_connections.remove(websocket)
                break
    except Exception as e:
        if websocket in active_connections:
            active_connections.remove(websocket)
        await websocket.close()

@app.get("/api/v1/health")
async def health_check():
    """Check system health status"""
    try:
        health_status = {
            "status": "healthy",
            "api": True,
            "database": True,  # Placeholder for actual database check
            "cache": True       # Placeholder for actual cache check
        }
        return health_status
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        ERROR_COUNT.inc()
        return {
            "status": "unhealthy",
            "error": str(e)
        }

@app.get("/api/v1/errors")
async def get_errors():
    """Get recent error logs"""
    try:
        return []  # Placeholder for fetching actual cached errors
    except Exception as e:
        logger.error(f"Error fetching error logs: {str(e)}")
        return []

@app.get("/api/v1/performance")
async def get_performance():
    """Get performance metrics"""
    try:
        metrics = {
            "data": [],  # Placeholder for actual performance data
            "summary": {
                "avgResponseTime": REQUEST_LATENCY._observe(),  # Placeholder for average response time calculation
                "requestCount": REQUEST_COUNT._value.get(),
                "errorRate": (ERROR_COUNT._value.get() / REQUEST_COUNT._value.get()) if REQUEST_COUNT._value.get() > 0 else 0
            }
        }
        return metrics
    except Exception as e:
        logger.error(f"Error fetching performance metrics: {str(e)}")
        return {"data": [], "summary": {}}

@app.post("/api/v1/predict")
async def predict_fraud(
    features: Dict[str, Any],
    _: str = Depends(verify_api_key)
):
    """Predict fraud probability for a transaction"""
    prediction = detector.predict_fraud_probability(features)
    
    if prediction['is_fraudulent']:
        event_data = {
            **features,
            **prediction
        }
        await publish_event("fraud_alerts", event_data)
        await notify_clients({
            "type": "fraud_alert",
            "data": event_data
        })
    
    return prediction

@app.post("/api/v1/feedback")
async def submit_feedback(
    prediction_id: str,
    actual_outcome: bool,
    features: Dict[str, Any],
    _: str = Depends(verify_api_key)
):
    """Submit feedback for model improvement"""
    try:
        detector.record_feedback(prediction_id, actual_outcome, features)
        return {"status": "success", "message": "Feedback recorded successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

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

@app.post("/auth/password-reset")
async def password_reset(email: str):
    # In production, this would:
    # 1. Generate a secure token
    # 2. Store it with an expiration
    # 3. Send email with reset link
    return {"status": "success"}

@app.post("/auth/verify-email")
async def verify_email(code: str):
    # In production, this would verify the code
    # against a stored value
    return {"status": "success"}

@app.post("/auth/mfa/setup")
async def setup_mfa(method: str):
    # In production, this would:
    # 1. Generate MFA secrets
    # 2. Store them securely
    # 3. Return QR code for app setup if applicable
    return {"status": "success"}

@app.post("/auth/mfa/verify")
async def verify_mfa(code: str):
    # In production, this would verify the MFA code
    return {"status": "success"}

@app.middleware("http")
async def anonymize_response_data(request, call_next):
    response = await call_next(request)
    if "application/json" in response.headers.get("content-type", ""):
        response.body = anonymize_data(response.body)
    return response

@app.middleware("http")
async def monitor_requests(request, call_next):
    """Middleware to monitor request metrics"""
    REQUEST_COUNT.inc()
    start_time = time.time()
    
    try:
        response = await call_next(request)
        return response
    except Exception as e:
        ERROR_COUNT.inc()
        logger.error(f"Request failed: {str(e)}")
        raise
    finally:
        REQUEST_LATENCY.observe(time.time() - start_time)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
