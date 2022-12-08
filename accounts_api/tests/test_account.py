from fastapi.testclient import TestClient
from queries.accounts import AccountQueries
from main import app

client = TestClient(app)


class EmptyAccountRepository:
    def get_all(self):
        return []


def test_get_all_accounts():

    # Arrange
    app.dependency_overrides[AccountQueries] = EmptyAccountRepository

    # Act
    response = client.get("/api/accounts/")

    # Clean up
    app.dependency_overrides = {}

    # Assert
    assert response.status_code == 200
    assert response.json() == []
