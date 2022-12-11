from .client import Queries
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from models import (
    FavoriteIn,
    Favorite,
    FavoriteOut,
    VisitedIn,
    Visited,
    VisitedOut
)


class ParkBooleanQueries(Queries):
    DB_NAME = (
        "library"
    )
    COLLECTION = (
        "park_booleans"
    )

    def create_favorite(self, account_id, info: FavoriteIn) -> Favorite:
        props = info.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        props["account_id"] = account_id
        return Favorite(**props)
