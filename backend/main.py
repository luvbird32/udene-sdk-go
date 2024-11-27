"""
FastAPI Main Application Module
Configures and initializes the FastAPI application with middleware, CORS, and routes.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from routes import health, metrics, fraud, privacy
from middleware.monitoring import monitor_requests
from middleware.privacy import anonymize_response_data
from middleware.security import SecurityHeadersMiddleware

app = FastAPI(title="Udene - Fraud Detection API")

# Configure CORS to allow specified origins and methods
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Add custom middleware for security, monitoring and data anonymization
app.add_middleware(SecurityHeadersMiddleware)
app.middleware("http")(anonymize_response_data)
app.middleware("http")(monitor_requests)

# Initialize Prometheus metrics for monitoring
# Configure Instrumentator before including routers
Instrumentator().instrument(app)

# Include route handlers for different API endpoints
app.include_router(health.router)
app.include_router(metrics.router)
app.include_router(fraud.router)
app.include_router(privacy.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)