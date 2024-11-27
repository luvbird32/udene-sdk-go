"""
Privacy Middleware Module
Implements data anonymization for response data.
"""
from ..services.privacy import anonymize_data

async def anonymize_response_data(request, call_next):
    """
    Middleware to anonymize sensitive data in responses
    
    Args:
        request: The incoming request
        call_next: The next middleware in the chain
        
    Returns:
        The anonymized response
    """
    response = await call_next(request)
    if "application/json" in response.headers.get("content-type", ""):
        response.body = anonymize_data(response.body)
    return response