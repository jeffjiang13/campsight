from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
from models import (
    FavoriteIn,
    Favorite,
    FavoriteOut,
    VisitedIn,
    Visited,
    VisitedOut
)
from .auth import authenticator
from models import AccountOut, Account
from routers.sockets import socket_manager
from queries.favorites import ParkBooleanQueries

router = APIRouter()

@router.post("/api/favorites", response_model=FavoriteOut)
async def create_favorite(
    favorite: FavoriteIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ParkBooleanQueries = Depends(),
):
    print(account_data)
    new_favorite = repo.create_favorite(account_data["id"], favorite)
    await socket_manager.broadcast_refetch()
    return new_favorite
