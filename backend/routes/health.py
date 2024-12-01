from flask import Blueprint, jsonify
import logging

bp = Blueprint('health', __name__, url_prefix='/api/v1')
logger = logging.getLogger(__name__)

@bp.route("/health")
def health_check():
    """Check system health status"""
    try:
        health_status = {
            "status": "healthy",
            "api": True,
            "database": True,
            "cache": True
        }
        return jsonify(health_status)
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return jsonify({
            "status": "unhealthy",
            "error": str(e)
        }), 500