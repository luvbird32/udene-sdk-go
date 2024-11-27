"""
Authentication Dependencies Module
Provides authentication-related dependencies for FastAPI routes.
"""
from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

# Initialize security scheme for Bearer token authentication
security = HTTPBearer()
API_KEYS = {"your_api_key_here"}

def verify_api_key(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """
    Verify the API key from the Authorization header
    
    Args:
        credentials: The HTTP Authorization credentials containing the API key
        
    Returns:
        str: The verified API key
        
    Raises:
        HTTPException: If the API key is invalid
    """
    if credentials.credentials not in API_KEYS:
        raise HTTPException(
            status_code=401,
            detail="Invalid API key"
        )
    return credentials.credentials