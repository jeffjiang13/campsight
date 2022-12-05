from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Union, Optional
from models import (
    ReviewIn,
    ReviewOut,
    Review,
    Error,
)
from .auth import authenticator
from models import AccountOut, Account
from routers.sockets import socket_manager
from queries.review import ReviewQueries

router = APIRouter()

not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


@router.get("/api/reviews/{review_id}", response_model=Optional[ReviewOut])
def get_one_review(
    review_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewQueries = Depends(),
) -> ReviewOut:
    review = repo.get_one(review_id)

    if review is None:
        return {"message not found"}

    return review


@router.get("/api/reviews", response_model=Union[List[Review], Error])
async def get_all_reviews(
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewQueries = Depends(),
):
    return repo.get_all()


@router.post("/api/review", response_model=ReviewOut)
async def create_review(
    review: ReviewIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewQueries = Depends(),
):
    account = AccountOut(**account_data)
    review = repo.create(review)
    await socket_manager.broadcast_refetch()
    return review


@router.put("/api/reviews/{review_id}", response_model=Union[Error, ReviewOut])
async def update_review(
    info: ReviewIn,
    review_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewQueries = Depends(),
) -> Union[Error, ReviewOut]:
    return repo.update(review_id, info)


@router.delete("/api/reviews/{review_id}", response_model=bool)
async def delete_review(
    review_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    repo: ReviewQueries = Depends(),
) -> bool:
     repo.delete(review_id)
     return True
