from fastapi.testclient import TestClient
from queries.favorites import FavoriteQueries
from main import app
from routers.accounts import AccountToken
from routers.auth import authenticator
from models import AccountOut

client = TestClient(app)
test_account = AccountOut(id="1234567890", email="paula_bean@catmail.com", full_name="Paula Bean")  # noqa: E501
test_account_token = AccountToken(access_token="0987654321", type="Bearer", account=test_account)  # noqa: E501


async def override_get_token():
    return test_account.dict()


class TestFavoriteRepository:
    def get_all_favorites_in_account(self, account_id):
        return [
            {
                "favorited": True,
                "park_code": "anch",
                "account_id": "1234567890",
                "id": "639547d437f7872da08e43c5"
            }
        ]


def test_get_favorites():
    app.dependency_overrides[FavoriteQueries] = TestFavoriteRepository
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = override_get_token
    response = client.get(f'/api/favorites/{test_account.id}')
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == [
        {
            "favorited": True,
            "park_code": "anch",
            "account_id": "1234567890",
            "id": "639547d437f7872da08e43c5"
        }
    ]
