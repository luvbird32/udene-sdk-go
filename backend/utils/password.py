"""
Password Utility Module
Handles password hashing and verification.
"""
import bcrypt
from typing import Tuple

def hash_password(password: str) -> Tuple[bytes, bytes]:
    """
    Hash a password using bcrypt with a random salt
    
    Args:
        password: The plain text password
        
    Returns:
        Tuple containing the salt and hashed password
    """
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode(), salt)
    return salt, hashed

def verify_password(password: str, hashed_password: bytes) -> bool:
    """
    Verify a password against its hash
    
    Args:
        password: The plain text password to verify
        hashed_password: The hashed password to check against
        
    Returns:
        bool: True if password matches, False otherwise
    """
    return bcrypt.checkpw(password.encode(), hashed_password)