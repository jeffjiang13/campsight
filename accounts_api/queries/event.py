from bson.objectid import ObjectId
from typing import List
from .client import Queries
from models import EventIn, EventOut
from pymongo.collection import ReturnDocument


class EventQueries(Queries):
    DB_NAME = "library"
    COLLECTION = "events"

    def create(self, event: EventIn) -> EventOut:
        props = event.dict()
        self.collection.insert_one(props)
        props["id"] = str(props["_id"])
        return EventOut(**props)

    def delete(self, id: str):
        self.collection.delete_one(
            {
                "_id": ObjectId(id),
            }
        )

    def get_all(self) -> List[EventOut]:
        result = self.collection.find()
        event_props_list = list(result)
        for event_props in event_props_list:
            event_props["id"] = str(event_props["_id"])
        return [EventOut(**event) for event in event_props_list]

    def update(self, id: str, info: EventIn):
        filter = {
                "_id": ObjectId(id),
            }
        event = self.collection.find_one(filter)
        updated_event = self.collection.find_one_and_update(event, {"$set": info.dict()}, return_document=ReturnDocument.AFTER)  # noqa: 501
        updated_event["id"] = str(updated_event["_id"])
        return EventOut(**updated_event)
