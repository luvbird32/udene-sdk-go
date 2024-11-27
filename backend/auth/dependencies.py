from fastapi import HTTPException, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

security = HTTPBearer()
API_KEYS = {"your_api_key_here"}

def verify_api_key(credentials: HTTPAuthorizationCredentials = Depends(security)) -> str:
    """Verify the API key from the Authorization header"""
    if credentials.credentials not in API_KEYS:
        raise HTTPException(
            status_code=401,
            detail="Invalid API key"
        )
    return credentials.credentials