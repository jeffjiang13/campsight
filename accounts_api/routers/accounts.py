from fastapi import (
    Depends,
    HTTPException,
    status,
    Response,
    APIRouter,
    Request,
)
from jwtdown_fastapi.authentication import Token
from .auth import authenticator
from pydantic import BaseModel
from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
)
from models import (
    Account,
    AccountIn,
    AccountUpdateIn,
    AccountOut,
)
from queries.profiles import ProfileQueries
from models import ProfileIn
from queries.sessions import SessionQueries


not_authorized = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Invalid authentication credentials",
    headers={"WWW-Authenticate": "Bearer"},
)


class AccountForm(BaseModel):
    username: str
    password: str


class AccountToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=AccountToken | None)
async def get_token(
    request: Request,
    account: Account = Depends(authenticator.try_get_current_account_data),
) -> AccountToken | None:
    if account and authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.put(
    "/api/accounts/{account_id}",
    response_model=AccountToken | HttpError,
)
async def update_account(
    account_id: str,
    info: AccountUpdateIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
):
    if info.password is not None:
        hashed_password = authenticator.hash_password(info.password)
    else:
        hashed_password = None

    try:

        account = repo.update(account_id, info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot Create An Account With Those Credentials",
        )

    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(response, request, form, repo)
    return AccountToken(account=account, **token.dict())


@router.post("/api/accounts/", response_model=AccountToken | HttpError)
async def create_account(
    info: AccountIn,
    profile: ProfileIn,
    request: Request,
    response: Response,
    repo: AccountQueries = Depends(),
    profile_repo: ProfileQueries = Depends(),
    session: SessionQueries = Depends(),


):

    hashed_password = authenticator.hash_password(
        info.password
    )
    try:
        account = repo.create(info, hashed_password)
        profile = profile_repo.create(profile)
        profile.account_id = account.id
        profile_repo.update_id(id=profile.id, account_id=profile.account_id)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot Create An Account With Those Credentials",
        )

    form = AccountForm(username=info.email, password=info.password)
    token = await authenticator.login(
        response, request, form, repo, session
        )
    return AccountToken(account=account, **token.dict())


@router.get("/api/accounts/", response_model=list[AccountOut])
async def get_accounts(repo: AccountQueries = Depends()):
    return repo.get_all()


@router.delete("/api/accounts/{account_id}", response_model=bool)
async def delete_account(
    account_id: str,
    repo: AccountQueries = Depends(),
):
    repo.delete(account_id)
    return True


@router.delete("/api/sessions/{account_id}", response_model=bool)
async def delete_session(
    account_id: str,
    repo: SessionQueries = Depends(),
) -> bool:

    repo.delete_sessions(account_id)
    return True
