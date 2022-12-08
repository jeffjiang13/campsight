import json
from fastapi.testclient import TestClient
from main import app
from queries.profiles import ProfileQueries
from routers.auth import authenticator
from routers.accounts import AccountToken
from models import AccountOut

client = TestClient(app)


fake_account = AccountOut(
    id="accountID", email="jeff@email", full_name="name"
)

fake_account_token = AccountToken(
    access_token="accesstoken", type="Bearer", account=fake_account
)


async def override_get_token():
    return fake_account.dict()

class MockProfileRepo:

    def create(self, profile):

        response = {
            "city": "string",
            "state": "string",
            "description": "string",
            "social_media": "string"
        }
        response.update(profile)
        return response




def test_create_profile():
    app.dependency_overrides[ProfileQueries] = MockProfileRepo
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = override_get_token

    profile = {
        "id": "string",
        "city": "New York",
        "state": "NY",
        "description": "Hello World!",
        "account_id": "string",
        "social_media": "jeffjiang13"

    }
    response = client.post('/api/profiles', json.dumps(profile))

    app.dependency_overrides = {}

    assert response.status_code == 200
    assert response.json()['social_media'] == 'jeffjiang13'
