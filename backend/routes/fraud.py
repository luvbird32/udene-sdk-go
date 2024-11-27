from fastapi import APIRouter, Depends, HTTPException, WebSocket, WebSocketDisconnect
from typing import Dict, Any, List
from ..auth.dependencies import verify_api_key
from ..ml.ensemble_detector import EnsembleDetector
from ..services.messaging import publish_event

router = APIRouter(prefix="/api/v1")
detector = EnsembleDetector()

# WebSocket connections store
active_connections: List[WebSocket] = []

async def notify_clients(message: dict):
    """Send updates to all connected WebSocket clients"""
    for connection in active_connections:
        try:
            await connection.send_json(message)
        except WebSocketDisconnect:
            active_connections.remove(connection)

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    active_connections.append(websocket)
    try:
        while True:
            try:
                data = await websocket.receive_text()
                await websocket.send_json({"status": "received", "data": data})
            except WebSocketDisconnect:
                active_connections.remove(websocket)
                break
    except Exception as e:
        if websocket in active_connections:
            active_connections.remove(websocket)
        await websocket.close()

@router.post("/predict")
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

@router.post("/feedback")
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