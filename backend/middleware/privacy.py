from ..services.privacy import anonymize_data

async def anonymize_response_data(request, call_next):
    response = await call_next(request)
    if "application/json" in response.headers.get("content-type", ""):
        response.body = anonymize_data(response.body)
    return response