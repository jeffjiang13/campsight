import os
from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from routers import auth
from routers import accounts, profiles, sockets, event, review, favorites


app = FastAPI()
router = APIRouter()

origins = [
    os.environ.get("CORS_HOST", "http://localhost"),
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.authenticator.router)
app.include_router(accounts.router)
app.include_router(sockets.router)
app.include_router(profiles.router)
app.include_router(event.router, prefix="/api")
app.include_router(review.router)
app.include_router(favorites.router)
