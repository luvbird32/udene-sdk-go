from flask import Blueprint, jsonify, request, websocket
from typing import Dict, Any, List
from ..auth.dependencies import verify_api_key
from ..ml.ensemble_detector import EnsembleDetector
from ..services.messaging import publish_event

bp = Blueprint('fraud', __name__, url_prefix='/api/v1')
detector = EnsembleDetector()

# WebSocket connections store
active_connections: List[websocket] = []

@bp.route("/predict", methods=["POST"])
def predict_fraud():
    """Predict fraud probability for a transaction"""
    verify_api_key()
    features = request.get_json()
    
    prediction = detector.predict_fraud_probability(features)
    
    if prediction['is_fraudulent']:
        event_data = {
            **features,
            **prediction
        }
        publish_event("fraud_alerts", event_data)
        # Note: WebSocket functionality needs to be implemented differently in Flask
    
    return jsonify(prediction)

@bp.route("/feedback", methods=["POST"])
def submit_feedback():
    """Submit feedback for model improvement"""
    verify_api_key()
    data = request.get_json()
    try:
        detector.record_feedback(
            data['prediction_id'],
            data['actual_outcome'],
            data['features']
        )
        return jsonify({"status": "success", "message": "Feedback recorded successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500