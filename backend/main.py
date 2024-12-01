"""
Flask Main Application Module
Configures and initializes the Flask application with middleware, CORS, and routes.
"""
from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from datetime import datetime, timedelta
import jwt
from routes import health, metrics, fraud, privacy

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173"]}})
socketio = SocketIO(app, cors_allowed_origins="*")

# Secret key for JWT tokens
SECRET_KEY = "your-secret-key-here"  # In production, use environment variable
ALGORITHM = "HS256"

# WebSocket event handlers
@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('connection_response', {'data': 'Connected'})

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('fraud_alert')
def handle_fraud_alert(data):
    """Handle incoming fraud alerts and broadcast to all connected clients"""
    emit('fraud_alert_broadcast', data, broadcast=True)

@app.route("/auth/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")
    
    # For demo purposes - in production, verify against database
    if email == "test@example.com" and password == "password123":
        # Create access token
        access_token = create_access_token(
            data={"sub": "user123", "email": email}
        )
        
        return jsonify({
            "token": access_token,
            "user": {
                "id": "user123",
                "email": email,
                "name": "Test User"
            }
        })
    
    return jsonify({"error": "Invalid credentials"}), 401

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Register blueprints for routes
app.register_blueprint(health.bp)
app.register_blueprint(metrics.bp)
app.register_blueprint(fraud.bp)
app.register_blueprint(privacy.bp)

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=8000, debug=True)