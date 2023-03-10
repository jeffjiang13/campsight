from bson.objectid import ObjectId
from pydantic import BaseModel
from typing import Optional
from typing import List


class PydanticObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, value: ObjectId | str) -> ObjectId:
        if value:
            try:
                ObjectId(value)
            except:  # noqa: E722
                raise ValueError(f"Not a valid object id: {value}")
        return value


class SessionOut(BaseModel):
    jti: str
    account_id: str


class AccountUpdateIn(BaseModel):
    email: Optional[str]
    password: Optional[str]
    full_name: Optional[str]


class AccountIn(BaseModel):
    email: str
    password: str
    full_name: str


class Account(AccountIn):
    id: PydanticObjectId


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str


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
    city: Optional[str]
    state: Optional[str]
    description: Optional[str]
    social_media: Optional[str]


class Profile(ProfileIn):
    id: str
    account_id: str | None = None


class ProfileOut(BaseModel):
    id: Optional[str]
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


class FavoriteIn(BaseModel):
    favorited: bool
    park_code: str
    account_id: str


class Favorite(FavoriteIn):
    id: PydanticObjectId


class FavoriteOut(FavoriteIn):
    id: str


class VisitedIn(BaseModel):
    visited: bool
    park_code: str
    account_id: str


class Visited(VisitedIn):
    id: PydanticObjectId


class VisitedOut(VisitedIn):
    id: str
