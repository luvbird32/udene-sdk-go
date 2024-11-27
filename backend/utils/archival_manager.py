from datetime import datetime
import logging
from pymongo import MongoClient
from ..config.database import DATABASE_CONFIG, ARCHIVAL_RULES

logger = logging.getLogger(__name__)

class ArchivalManager:
    def __init__(self):
        self.client = MongoClient(
            host=DATABASE_CONFIG["host"],
            port=DATABASE_CONFIG["port"]
        )
        self.db = self.client[DATABASE_CONFIG["name"]]
        self.archive_db = self.client[f"{DATABASE_CONFIG['name']}_archive"]

    def archive_old_data(self):
        """Archive old data based on configured rules"""
        for collection_name, rules in ARCHIVAL_RULES.items():
            try:
                source_collection = self.db[collection_name]
                archive_collection = self.archive_db[collection_name]
                
                cutoff_date = datetime.now() - rules["age_limit"]
                query = {"timestamp": {"$lt": cutoff_date}}
                
                # Archive in batches
                while True:
                    docs = list(source_collection
                              .find(query)
                              .limit(rules["batch_size"]))
                    
                    if not docs:
                        break
                        
                    # Insert into archive and delete from source
                    archive_collection.insert_many(docs)
                    ids = [doc["_id"] for doc in docs]
                    source_collection.delete_many({"_id": {"$in": ids}})
                    
                    logger.info(f"Archived {len(docs)} documents from {collection_name}")
                    
            except Exception as e:
                logger.error(f"Failed to archive {collection_name}: {str(e)}")

    def retrieve_archived_data(self, collection_name: str, query: dict):
        """Retrieve data from archive"""
        try:
            archive_collection = self.archive_db[collection_name]
            return list(archive_collection.find(query))
        except Exception as e:
            logger.error(f"Failed to retrieve archived data: {str(e)}")
            return []