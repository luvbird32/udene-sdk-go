from fastapi import APIRouter, Security, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from ..auth.dependencies import security, verify_api_key
from ..models.privacy import PrivacyRequest, RetentionPolicy
from ..services.privacy import gdpr_handler, ccpa_handler, retention_manager

router = APIRouter(prefix="/api/v1/privacy")

@router.post("/data-request")
async def handle_privacy_request(
    request: PrivacyRequest,
    credentials: HTTPAuthorizationCredentials = Security(security)
):
    verify_api_key(credentials)
    
    if request.region == "EU":
        return await gdpr_handler.process_request(request)
    elif request.region == "California":
        return await ccpa_handler.process_request(request)
    else:
        return await gdpr_handler.process_request(request)

@router.put("/retention-policy")
async def update_retention_policy(
    policy: RetentionPolicy,
    credentials: HTTPAuthorizationCredentials = Security(security)
):
    verify_api_key(credentials)
    return await retention_manager.update_policy(policy)