import os
import pymongo

client = pymongo.MongoClient(os.environ["DATABASE_URL"])
# dbname = os.environ['MONGODATABASE']


class Queries:
    @property
    def collection(self):
        db = client[self.DB_NAME]
        return db[self.COLLECTION]
