from fastapi.testclient import TestClient
from queries.profiles import ProfileQueries
from main import app
from models import AccountOut
from routers.auth import authenticator
from routers.accounts import AccountToken

fake_account = AccountOut(
    id="accountID", email="tyler@email", full_name="name"
)

fake_account_token = AccountToken(
    access_token="accesstoken", type="Bearer", account=fake_account
)

async def override_get_token():
    return fake_account.dict()

class ProfileQueriesMock:
  def get_all(self):
    return []

def test_profile_query():
  app.dependency_overrides[ProfileQueries] = ProfileQueriesMock
  app.dependency_overrides[
    authenticator.try_get_current_account_data
  ] = override_get_token

  client = TestClient(app)

  response = client.get("/api/profiles/")
  print(response)
  assert response.status_code == 200
  assert response.json() == []

  app.dependency_overrides = {}
