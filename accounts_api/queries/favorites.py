from .client import Queries
from typing import List
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


class FavoriteQueries(Queries):
    DB_NAME = "library"
    COLLECTION = "favorites"

    def create_favorite(self, account_id, info: FavoriteIn) -> Favorite:
        props = info.dict()
        props["account_id"] = account_id
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return Favorite(**props)

    def get_all_favorites_in_account(self, account_id: str) -> List[FavoriteOut]:
        db = self.collection.find({"account_id": account_id})
        favorites = []
        for favorite in db:
            favorite["id"] = str(favorite["_id"])
            favorites.append(FavoriteOut(**favorite))
        return favorites

    def delete_favorites(self, account_id: str, park_code: str):
        response = self.collection.delete_many(
            {
                "account_id": account_id,
                "park_code": park_code,
            }
        )
        print(response)
