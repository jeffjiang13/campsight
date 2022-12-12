from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Union, Optional
from models import (
    ProfileIn,
    ProfileOut,
    Profile,
    Error,
)
from .auth import authenticator
from models import AccountOut
from routers.sockets import socket_manager
from queries.profiles import ProfileQueries

router = APIRouter()

not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.get("/api/profiles/{profile_id}", response_model=Optional[ProfileOut])
def get_one_profile(
    profile_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileQueries = Depends(),
):
    profile = repo.get_one(profile_id)

    if profile is None:
        return {"message: profile not found"}

    return profile


@router.get("/api/profiles", response_model=Union[List[Profile], Error])
async def get_all_profiles(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileQueries = Depends(),
):
    return repo.get_all()


@router.post("/api/profiles", response_model=ProfileOut)
async def create_profile(
    profile: ProfileIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileQueries = Depends(),
):
    account = AccountOut(**account_data)  # noqa: F841
    profile = repo.create(profile)
    await socket_manager.broadcast_refetch()
    return profile


@router.put("/api/profiles/{profile_id}", response_model=Union[Error, ProfileOut])  # noqa: E501
async def update_profile(
    info: ProfileIn,
    profile_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileQueries = Depends(),
) -> Union[Error, ProfileOut]:
    return repo.update(profile_id, info)


@router.delete("/api/profiles/{profile_id}", response_model=bool)
async def delete_profile(
    profile_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileQueries = Depends(),
) -> bool:
    repo.delete(profile_id)
    return True
