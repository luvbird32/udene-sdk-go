"""
FastAPI Main Application Module
Configures and initializes the FastAPI application with middleware, CORS, and routes.
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import jwt
from datetime import datetime, timedelta

app = FastAPI(title="Udene - Fraud Detection API")

# Configure CORS to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite's default dev server port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Secret key for JWT tokens
SECRET_KEY = "your-secret-key-here"  # In production, use environment variable
ALGORITHM = "HS256"

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    name: str

@app.post("/auth/login")
async def login(user_data: UserLogin):
    # For demo purposes - in production, verify against database
    if user_data.email == "test@example.com" and user_data.password == "password123":
        # Create access token
        access_token = create_access_token(
            data={"sub": "user123", "email": user_data.email}
        )
        
        return {
            "token": access_token,
            "user": {
                "id": "user123",
                "email": user_data.email,
                "name": "Test User"
            }
        }
    raise HTTPException(
        status_code=401,
        detail="Invalid credentials"
    )

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Keep existing routes
# ... keep existing code (health, metrics, fraud, and privacy routes)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)