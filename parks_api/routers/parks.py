from fastapi import APIRouter, Depends, Response
from typing import Union, List, Optional
import httpx
from keys import CAMP_API

router = APIRouter()

@router.get("/allparks")
async def submit():
    return httpx.get(f'https://developer.nps.gov/api/v1/parks?limit=500&api_key={CAMP_API}').json()

@router.get("/maplist")
async def submit():
    return httpx.get(f'https://developer.nps.gov/api/v1/parks?limit=500&api_key={CAMP_API}').json()

@router.get("/list")
async def submit(start: int):
    return httpx.get(f'https://developer.nps.gov/api/v1/parks?limit=9&start={start}&api_key={CAMP_API}').json()

@router.get("/details")
async def submit(parkCode: str):
    return httpx.get(f'https://developer.nps.gov/api/v1/parks?parkCode={parkCode}&api_key={CAMP_API}').json()

@router.get("/getpark")
async def get_park(parkCode: str):
    response = httpx.get(f"https://developer.nps.gov/api/v1/parks?parkCode={parkCode}&api_key={CAMP_API}")
    return response.json()["data"]

@router.get("/getactivities")
async def get_activities():
    response = httpx.get(f"https://developer.nps.gov/api/v1/activities?api_key={CAMP_API}")
    return response.json()["data"]

@router.get("/searchbyactivities")
async def get_parks_by_activities(activity_key: str):
    response = httpx.get(f"https://developer.nps.gov/api/v1/activities/parks?id={activity_key}&api_key={CAMP_API}")
    return response.json()["data"][0]["parks"]

@router.get("/getalerts")
async def get_alerts_by_park(parkCode: str):
    response = httpx.get(f"https://developer.nps.gov/api/v1/alerts?parkCode={parkCode}&api_key={CAMP_API}")
    return response.json()["data"][0]

@router.get("/getcampgrounds")
async def get_campgrounds(parkCode: str):
    response = httpx.get(f"https://developer.nps.gov/api/v1/campgrounds?parkCode={parkCode}&api_key={CAMP_API}")
    return response.json()["data"]

@router.get("/getwebcams")
async def get_webcams(parkCode: str):
    response = httpx.get(f"https://developer.nps.gov/api/v1/webcams?parkCode={parkCode}&api_key={CAMP_API}")
    return response.json()["data"]
