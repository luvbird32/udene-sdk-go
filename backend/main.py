from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prometheus_fastapi_instrumentator import Instrumentator
from .routes import health, metrics, fraud, privacy
from .middleware.monitoring import monitor_requests
from .middleware.privacy import anonymize_response_data

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

# Add middlewares
app.middleware("http")(anonymize_response_data)
app.middleware("http")(monitor_requests)

# Include routers
app.include_router(health.router)
app.include_router(metrics.router)
app.include_router(fraud.router)
app.include_router(privacy.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)