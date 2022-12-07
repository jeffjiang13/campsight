from bson.objectid import ObjectId
from pydantic import BaseModel
from typing import List, Optional


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except:
                raise ValueError(f"Not a valid object id: {value}")
        return value


class AccountUpdateIn(BaseModel):
    email: Optional[str]
    password: Optional[str]
    full_name: Optional[str]
    roles: Optional[List[str]]


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class Account(AccountIn):
    id: PydanticObjectId
    roles: List[str]


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str
    roles: List[str]

class EventIn(BaseModel):
    name: str
    date: str
    location: str
    description: Optional[str]
class Event(EventIn):
    id: PydanticObjectId


class EventOut(EventIn):
    id: str

class EventList(BaseModel):
    events: List[EventOut]


class ProfileIn(BaseModel):
    name: Optional[str]
    city: Optional[str]
    state: Optional[str]
    description: Optional[str]
    social_media: Optional[str]


class Profile(ProfileIn):
    id: str
    account_id: str | None = None

class ProfileOut(BaseModel):
    id: str
    name: Optional[str]
    city: Optional[str]
    state: Optional[str]
    description: Optional[str]
    account_id: Optional[str]
    social_media: Optional[str]

class Error(BaseModel):
    message: str


class ReviewIn(BaseModel):
    rating: Optional[str]
    review: Optional[str]
    parkCode: str

class Review(ReviewIn):
    id: str

class ReviewOut(BaseModel):
    id: str
    rating: Optional[str]
    review: Optional[str]
    parkCode: str
