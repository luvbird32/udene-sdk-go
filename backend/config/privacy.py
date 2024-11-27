from typing import Dict, Any
import json
from datetime import datetime, timedelta

class PrivacyConfig:
    RETENTION_PERIODS = {
        "EU": {
            "transaction": 730,  # 2 years
            "userProfile": 365,  # 1 year
            "fraudAlert": 1825   # 5 years
        },
        "California": {
            "transaction": 1095,  # 3 years
            "userProfile": 730,   # 2 years
            "fraudAlert": 1825    # 5 years
        },
        "Global": {
            "transaction": 1825,  # 5 years
            "userProfile": 730,   # 2 years
            "fraudAlert": 2555    # 7 years
        }
    }

    ANONYMIZATION_FIELDS = {
        "email": "hash",
        "phone": "mask",
        "ip_address": "mask",
        "card_number": "mask",
        "address": "truncate"
    }

    @staticmethod
    def get_retention_period(data_type: str, region: str) -> int:
        return PrivacyConfig.RETENTION_PERIODS.get(region, {}).get(
            data_type,
            PrivacyConfig.RETENTION_PERIODS["Global"][data_type]
        )

    @staticmethod
    def should_anonymize(field_name: str) -> bool:
        return field_name in PrivacyConfig.ANONYMIZATION_FIELDS

    @staticmethod
    def get_anonymization_method(field_name: str) -> str:
        return PrivacyConfig.ANONYMIZATION_FIELDS.get(field_name, "hash")