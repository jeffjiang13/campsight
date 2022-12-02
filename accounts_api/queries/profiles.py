from pydantic import BaseModel
from datetime import date
from typing import Optional, List, Union
from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError
from models import ProfileOut, ProfileIn, Profile, Error



class ProfileQueries(Queries):
    DB_NAME = (
        # Specifies which database we're querying or inserting data into
        "library"
    )
    COLLECTION = (
        # specifies which collection we're querying or inserting data into
        "profiles"
    )

    def get_one(self, profile_id : str) -> ProfileOut:
        props = self.collection.find_one({"_id": profile_id})
        if props is None:
            return None
        props["id"] = str(props["_id"])
        props["account_id"] = str(props["account_id"])
        return props

    def get_all(self) -> list[ProfileOut]:
        db = self.collection.find()
        accounts = []
        for account in db:
            account["id"] =  str(account["_id"])
            accounts.append(ProfileOut(**account))
        return accounts

    def delete(self, id : str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})

    def update(
        self,
        id: str,
        info: ProfileIn) -> Union[ProfileOut, Error]:
        props = info.dict()
        self.collection.find_out_and_uddate(
            {"_id": ObjectId(id)},
            {"$set": props},
            return_document=ReturnDocument.AFTER,
        )
        return ProfileOut(**props, id=id)

    def create(
        self, info: ProfileIn) -> ProfileOut:
        props = info.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["id"])

        return ProfileOut(**props)
