import subprocess
from datetime import datetime
import os
from typing import Optional
import logging
from ..config.database import DATABASE_CONFIG

logger = logging.getLogger(__name__)

class BackupManager:
    def __init__(self):
        self.backup_path = DATABASE_CONFIG["backup_path"]
        self._ensure_backup_directory()

    def _ensure_backup_directory(self):
        """Ensure backup directory exists"""
        os.makedirs(self.backup_path, exist_ok=True)

    def create_backup(self) -> Optional[str]:
        """Create a database backup"""
        try:
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            backup_file = f"{self.backup_path}/backup_{timestamp}.dump"
            
            # Using mongodump for MongoDB backup
            subprocess.run([
                "mongodump",
                f"--host={DATABASE_CONFIG['host']}",
                f"--port={DATABASE_CONFIG['port']}",
                f"--db={DATABASE_CONFIG['name']}",
                f"--out={backup_file}"
            ], check=True)
            
            logger.info(f"Backup created successfully: {backup_file}")
            return backup_file
        except Exception as e:
            logger.error(f"Backup failed: {str(e)}")
            return None

    def restore_backup(self, backup_file: str) -> bool:
        """Restore from a backup file"""
        try:
            subprocess.run([
                "mongorestore",
                f"--host={DATABASE_CONFIG['host']}",
                f"--port={DATABASE_CONFIG['port']}",
                f"--db={DATABASE_CONFIG['name']}",
                backup_file
            ], check=True)
            
            logger.info(f"Backup restored successfully from: {backup_file}")
            return True
        except Exception as e:
            logger.error(f"Restore failed: {str(e)}")
            return False