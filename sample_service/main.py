from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os, httpx
from keys import CAMP_API
from routers import parks

app = FastAPI()
app.include_router(parks.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/details")
async def submit(parkCode: str):
    return httpx.get(f'https://developer.nps.gov/api/v1/parks?parkCode={parkCode}&api_key={CAMP_API}').json()


@app.get("/api/launch-details")
def launch_details():
    return {
        "launch_details": {
            "year": 2022,
            "month": 12,
            "day": "9",
            "hour": 19,
            "min": 0,
            "tz:": "PST"
        }
    }

