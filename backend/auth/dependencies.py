from flask import request
from functools import wraps
from werkzeug.exceptions import Unauthorized

API_KEYS = {"udene_api_key_here"}

def verify_api_key():
    """
    Verify the API key from the Authorization header
    
    Returns:
        str: The verified API key
        
    Raises:
        Unauthorized: If the API key is invalid
    """
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        raise Unauthorized("Missing or invalid authorization header")
    
    api_key = auth_header.split(' ')[1]
    if api_key not in API_KEYS:
        raise Unauthorized("Invalid API key")
        
    return api_key