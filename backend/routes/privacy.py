from fastapi import APIRouter, Security, HTTPException
from fastapi.security import HTTPAuthorizationCredentials
from ..auth.dependencies import security, verify_api_key
from ..models.privacy import PrivacyRequest, RetentionPolicy
from ..services.privacy import privacy_handler

router = APIRouter(prefix="/api/v1/privacy")

@router.post("/data-request")
async def handle_privacy_request(
    request: PrivacyRequest,
    credentials: HTTPAuthorizationCredentials = Security(security)
):
    verify_api_key(credentials)
    return await privacy_handler.process_privacy_request(request.requestType, request.userId, request.region)

@router.put("/retention-policy")
async def update_retention_policy(
    policy: RetentionPolicy,
    credentials: HTTPAuthorizationCredentials = Security(security)
):
    verify_api_key(credentials)
    return await privacy_handler.update_retention_policy(policy.dict())