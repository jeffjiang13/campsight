from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Union, Optional
from queries.profiles import (
    ProfileIn,
    ProfileOut,
    ProfileQueries,
    CompleteProfile,
    Error,
)
from .auth import authenticator

router = APIRouter()
not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.get("/api/profiles/{username}", response_model=Optional[ProfileOut])
def get_one_profile(
    email: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileQueries = Depends(),
) -> ProfileOut:
    profile = repo.get_one(email)

    if profile is None:
        return {"message: profile not found"}

    return profile


@router.get("/api/profiles", response_model=Union[List[CompleteProfile], Error])
def get_all_profiles(
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
    return repo.create(profile, account_data)


@router.put("/api/profiles/{username}", response_model=Union[Error, ProfileOut])
async def update_profile(
    profile: ProfileIn,
    email: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileQueries = Depends(),
) -> Union[Error, ProfileOut]:
    return repo.update(profile, email)


@router.delete("/api/profiles/{username}", response_model=bool)
async def delete_profile(
    email: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ProfileQueries = Depends(),
) -> bool:
    return repo.delete(email)
