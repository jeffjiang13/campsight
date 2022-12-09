from fastapi.testclient import TestClient
from queries.review import ReviewQueries
from main import app
from routers.accounts import AccountToken
from routers.auth import authenticator
from models import AccountOut

client = TestClient(app)
fake_account = AccountOut(id="accountID", email="cooper@gmail", full_name="cooper")  # noqa: E501
fake_account_token = AccountToken(access_token="accesstoken", type="Bearer", account=fake_account)  # noqa: E501


async def override_get_token():
    return fake_account.dict()


class EmptyReviewRepository:
    def get_all(self):
        return []


def test_get_all_reviews():
    app.dependency_overrides[ReviewQueries] = EmptyReviewRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = override_get_token
    response = client.get("api/reviews")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == []
