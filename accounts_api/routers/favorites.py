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
from queries.favorites import FavoriteQueries

router = APIRouter()

@router.post("/api/favorites", response_model=FavoriteOut)
async def create_favorite(
    favorite: FavoriteIn,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FavoriteQueries = Depends(),
):
    print(account_data)
    new_favorite = repo.create_favorite(account_data["id"], favorite)
    await socket_manager.broadcast_refetch()
    return new_favorite


@router.get("/api/favorites/{account_id}", response_model=List[FavoriteOut])
async def get_favorites(
    account_id: str,
    response: Response,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FavoriteQueries = Depends(),
):
    if account_id == account_data["id"]:
        favorites = repo.get_all_favorites_in_account(account_id)
        await socket_manager.broadcast_refetch()
        return favorites
    else:
        return "Account ID does not match current user"


@router.delete("/api/favorites/{account_id}/{park_code}", response_model=bool)
async def delete_favorites(
    account_id: str,
    park_code: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: FavoriteQueries = Depends(),
):
    repo.delete_favorites(account_id=account_id, park_code=park_code)
    await socket_manager.broadcast_refetch()
    return True
