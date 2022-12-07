from pydantic import BaseModel
from datetime import date
from typing import Optional, List, Union
from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError
from models import Review, ReviewIn, ReviewOut, Error



class ReviewQueries(Queries):
    DB_NAME = (
        # Specifies which database we're querying or inserting data into
        "library"
    )
    COLLECTION = (
        # specifies which collection we're querying or inserting data into
        "reviews"
    )

    def get_one(self, id : str) -> ReviewOut:
        props = self.collection.find_one({"_id": ObjectId(id)})
        if props is None:
            return None
        props["id"] = str(props["_id"])
        return ReviewOut(**props)

    def get_all(self) -> list[ReviewOut]:
        db = self.collection.find()
        accounts = []
        for account in db:
            account["id"] =  str(account["_id"])
            accounts.append(ReviewOut(**account))
        return accounts

    def get_parks(self, parkCode: str) -> list[ReviewOut]:
        print("Queries",type(parkCode))
        props = self.collection.find({"parkCode": parkCode})
        if props is None:
            return None
        reviews = []
        for prop in props:
            prop["id"] =  str(prop["_id"])
            reviews.append(ReviewOut(**prop))
        return reviews

    def delete(self, id : str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})

    def update(self, id:str, info:ReviewIn):
        filter = {
                "_id": ObjectId(id),
            }
        review = self.collection.find_one(filter)
        updated_review = self.collection.find_one_and_update(review, {"$set":info.dict()}, return_document=ReturnDocument.AFTER)
        updated_review["id"] = str(updated_review["_id"])
        return ReviewOut(**updated_review)


    def create(
        self, info: ReviewIn) -> Review:
        props = info.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        print(props["id"])
        return Review(**props)
