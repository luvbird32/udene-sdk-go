from pydantic import BaseModel
from typing import Literal

class PrivacyRequest(BaseModel):
    requestType: Literal["access", "deletion"]
    userId: str
    email: str
    region: Literal["EU", "California", "Other"]

class RetentionPolicy(BaseModel):
    dataType: Literal["transaction", "userProfile", "fraudAlert"]
    retentionPeriod: int
    anonymizationEnabled: bool
    region: Literal["EU", "California", "Global"]