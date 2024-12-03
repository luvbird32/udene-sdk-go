from typing import Dict, Any
import os
from datetime import datetime, timedelta

# Database Configuration
DATABASE_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", 27017)),
    "name": os.getenv("DB_NAME", "fraud_detection"),
    "backup_path": os.getenv("BACKUP_PATH", "/backups"),
    "archive_after_days": int(os.getenv("ARCHIVE_AFTER_DAYS", 90))
}

# Index Configuration
INDEXES = {
    "transactions": [
        {"fields": [("timestamp", -1)], "name": "timestamp_idx"},
        {"fields": [("user_id", 1)], "name": "user_idx"},
        {"fields": [("risk_score", -1)], "name": "risk_score_idx"},
    ],
    "alerts": [
        {"fields": [("created_at", -1)], "name": "created_at_idx"},
        {"fields": [("severity", -1)], "name": "severity_idx"},
    ],
    "user_activity": [
        {"fields": [("user_id", 1), ("timestamp", -1)], "name": "user_activity_idx"},
    ]
}

# Archival Configuration
ARCHIVAL_RULES = {
    "transactions": {
        "age_limit": timedelta(days=90),
        "batch_size": 1000,
    },
    "alerts": {
        "age_limit": timedelta(days=180),
        "batch_size": 500,
    }
}