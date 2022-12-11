from .client import Queries
from models import (
    FavoriteIn,
    Favorite,
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
