import time
import logging
from prometheus_client import Counter, Histogram

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize Prometheus metrics
REQUEST_COUNT = Counter('http_requests_total', 'Total HTTP requests')
REQUEST_LATENCY = Histogram('http_request_duration_seconds', 'HTTP request latency')
ERROR_COUNT = Counter('error_count', 'Number of errors')

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