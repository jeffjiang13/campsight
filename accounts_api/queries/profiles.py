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
        "library"
    )
    COLLECTION = (
        "profiles"
    )

    def get_one(self, id : str):
        props = self.collection.find_one({"_id": ObjectId(id)})
        if props is None:
            return None
        props["id"] = str(props["_id"])
        props["account_id"] = str(props["account_id"])


        return ProfileOut(**props)

    def get_all(self) -> list[ProfileOut]:
        db = self.collection.find()
        accounts = []
        for account in db:
            account["id"] =  str(account["_id"])
            account["account_id"] = str(account["account_id"])
            accounts.append(ProfileOut(**account))
        return accounts

    def delete(self, id : str) -> bool:
        return self.collection.delete_one({"_id": ObjectId(id)})

    def update(self, id:str, info:ProfileIn):
        filter = {
                "_id": ObjectId(id),
            }
        profile = self.collection.find_one(filter)
        updated_profile = self.collection.find_one_and_update(profile, {"$set":info.dict()}, return_document=ReturnDocument.AFTER)
        updated_profile["id"] = str(updated_profile["_id"])
        return ProfileOut(**updated_profile)


    def create(
        self, info: ProfileIn) -> ProfileOut:
        props = info.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])

        return Profile(**props)

    def update_id(self, id: str, account_id: str):
        self.collection.update_one(
            {"_id": ObjectId(id)},
            {"$set" : {
                "account_id" : account_id,
                }
            }
        )
        return Profile(id=id, account_id=account_id)
