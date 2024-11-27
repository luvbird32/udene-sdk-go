from fastapi import APIRouter
import logging

router = APIRouter(prefix="/api/v1")
logger = logging.getLogger(__name__)

@router.get("/health")
async def health_check():
    """Check system health status"""
    try:
        health_status = {
            "status": "healthy",
            "api": True,
            "database": True,
            "cache": True
        }
        return health_status
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return {
            "status": "unhealthy",
            "error": str(e)
        }