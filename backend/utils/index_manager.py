from typing import List, Dict, Any
import logging
from pymongo import MongoClient, ASCENDING, DESCENDING
from ..config.database import DATABASE_CONFIG, INDEXES

logger = logging.getLogger(__name__)

class IndexManager:
    def __init__(self):
        self.client = MongoClient(
            host=DATABASE_CONFIG["host"],
            port=DATABASE_CONFIG["port"]
        )
        self.db = self.client[DATABASE_CONFIG["name"]]

    def create_indexes(self):
        """Create all configured indexes"""
        for collection_name, indexes in INDEXES.items():
            collection = self.db[collection_name]
            for index in indexes:
                try:
                    fields = [(field, DESCENDING if direction == -1 else ASCENDING)
                             for field, direction in index["fields"]]
                    collection.create_index(fields, name=index["name"])
                    logger.info(f"Created index {index['name']} on {collection_name}")
                except Exception as e:
                    logger.error(f"Failed to create index {index['name']}: {str(e)}")

    def verify_indexes(self) -> Dict[str, List[str]]:
        """Verify all configured indexes exist"""
        missing_indexes = {}
        for collection_name, indexes in INDEXES.items():
            collection = self.db[collection_name]
            existing_indexes = collection.list_indexes()
            existing_names = [idx["name"] for idx in existing_indexes]
            
            missing = [idx["name"] for idx in indexes 
                      if idx["name"] not in existing_names]
            
            if missing:
                missing_indexes[collection_name] = missing
        
        return missing_indexes