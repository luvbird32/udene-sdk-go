from flask import Blueprint, jsonify
import random
from datetime import datetime
from functools import wraps
from ..auth.dependencies import verify_api_key
from ..models.metrics import FraudMetrics, Activity
from ..services.cache import cache_metrics, get_cached_metrics, cache_activity, get_cached_activity

bp = Blueprint('metrics', __name__, url_prefix='/api/v1')

def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = verify_api_key()
        return f(*args, **kwargs)
    return decorated_function

@bp.route("/metrics")
@require_api_key
def get_metrics():
    cached_metrics = get_cached_metrics()
    if cached_metrics:
        return jsonify(cached_metrics)

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
    return jsonify(metrics)

@bp.route("/activity")
@require_api_key
def get_activity():
    cached_activity = get_cached_activity()
    if cached_activity:
        return jsonify(cached_activity)

    activities = []
    for i in range(5):
        activities.append({
            "id": f"act_{i}",
            "type": "suspicious" if random.random() > 0.5 else "normal",
            "description": f"User activity detected {'(suspicious)' if random.random() > 0.5 else '(normal)'}",
            "timestamp": datetime.now().isoformat()
        })
    
    cache_activity(activities)
    return jsonify(activities)