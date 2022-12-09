from fastapi.testclient import TestClient
from routers.auth import authenticator
from main import app

client = TestClient(app)


def test_get_token_returns_none_for_user_not_logged_in():
    app.dependency_overrides[authenticator.try_get_current_account_data] = lambda: None  # noqa: E501
    response = client.get("/token")
    app.dependency_overrides = {}
    assert response.status_code == 200
    assert response.json() == None  # noqa: E711


def test_get_token_returns_token_for_user_logged_in():
    account = {
        "id": "123",
        "email": "example@example.com",
        "full_name": "Example",
    }
    app.dependency_overrides[
        authenticator.try_get_current_account_data
    ] = lambda: account
    response = client.get("/token", cookies={authenticator.cookie_name: "HELLO!"})  # noqa: E501
    app.dependency_overrides = {}
    assert response.status_code == 200
    data = response.json()
    assert data["access_token"] == "HELLO!"
    assert data["account"] == account
    assert data["token_type"] == "Bearer"
