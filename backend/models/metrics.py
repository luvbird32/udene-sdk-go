from pydantic import BaseModel
from typing import List
from datetime import datetime

class FraudMetrics(BaseModel):
    riskScore: float
    activeUsers: int
    alertCount: int
    apiCalls: int
    accuracy: float
    falsePositiveRate: float
    avgProcessingTime: float
    concurrentCalls: int

class Activity(BaseModel):
    id: str
    type: str
    description: str
    timestamp: datetime