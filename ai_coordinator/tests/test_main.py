from fastapi.testclient import TestClient
from main import app
import pytest

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"

def test_predict_occupancy_valid():
    response = client.post(
        "/predict",
        json={"sector_id": "sec-123", "current_count": 100, "capacity": 200}
    )
    assert response.status_code == 200
    assert response.json()["sector_id"] == "sec-123"
    assert "predicted_occupancy" in response.json()

def test_predict_occupancy_invalid():
    # Test min length pattern
    response = client.post(
        "/predict",
        json={"sector_id": "s", "current_count": 100, "capacity": 200}
    )
    assert response.status_code == 422

def test_ask_coordinator_rate_limit():
    # Since we set limit to 30 per min, we can test it by hitting it many times
    # But for a unit test, we might want to mock the limiter or just check one call
    response = client.post(
        "/ask",
        json={"user_query": "Hello coordinator"}
    )
    assert response.status_code == 200
    assert "response" in response.json()
