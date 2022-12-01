from pydantic import BaseModel
from datetime import date
from typing import Optional, List, Union
from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from pymongo.errors import DuplicateKeyError

class Error(BaseModel):
    message: str


class ProfileIn(BaseModel):
    name: str
    city: str
    state: str
    description: Optional[str]
    social_media: Optional[str]


class CompleteProfile(BaseModel):
    profile_id: int
    name: str
    city: str
    state: str
    img: str | None
    DOB: date | None
    gender: str | None
    bio: str | None


class ProfileOut(BaseModel):
    id: int
    name: str
    city: str
    state: str
    description: Optional[str]
    account_id: int
    social_media: Optional[str]


class ProfileQueries(Queries):
    DB_NAME = (
        # Specifies which database we're querying or inserting data into
        "library"
    )
    COLLECTION = (
        # specifies which collection we're querying or inserting data into
        "profiles"
    )

    def get(self, email : str) -> Optional[ProfileOut]:
        props = self.collection.find_one({"email": email})
        if props is None:
            return None
        props["id"] = str(props["_id"])
        return ProfileOut(**props)

    def get_all(self) -> Optional[ProfileOut]:
        db = self.collection.find()
        account_emails = []
        for account in db:
            account["id"] =  str(account["_id"])
            account_emails.append(account["email"])
        return account_emails

    def delete(self, email : str) -> bool:
        return self.collection.delete_one({"_email": ObjectId(email)})

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
        props["name"] = info.name
        props["city"] = info.city
        props["state"] = info.state
        props["description"] = info.description
        props["social_media"] = info.social_media
        self.collection.insert_one(props)
        return ProfileOut(**props)
