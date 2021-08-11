import fastapi
import sqlalchemy.orm as orm
import services
import schemas

from typing import List
from fastapi import Response
from fastapi.middleware.cors import CORSMiddleware

app = fastapi.FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware, 
    allow_origins=origins,
    allow_credentials=True, 
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.post("/api/users")
async def create_user(user: schemas.UserCreate, db: orm.Session = fastapi.Depends(services.get_db)):
    db_user = await services.get_user_by_email(user.email, db)

    if db_user:
        raise fastapi.HTTPException(status_code=400, detail="Username already in use")

    return await services.create_user(user, db)

@app.post("/api/users/available")
async def create_user(user: schemas.UserVerify, db: orm.Session = fastapi.Depends(services.get_db)):
    db_user_email = await services.get_user_by_email(user.email, db)

    if db_user_email:
        raise fastapi.HTTPException(status_code=400, detail="Email already in use")
    return fastapi.responses.JSONResponse(status_code=400,content={"detail": "Username available"})

@app.post("/api/token")
async def generate_token(response: Response, form_data: fastapi.security.OAuth2PasswordRequestForm = fastapi.Depends(), db: orm.Session = fastapi.Depends(services.get_db)):
    user = await services.authenticate_user(form_data.username, form_data.password, db)

    if not user:
        raise fastapi.HTTPException(status_code=401, detail="Invalid credentials")

    token = await services.create_token(user)
    response.set_cookie(key="access_token", value=f"Bearer {token}", httponly=True)
    return token

@app.get("/api/users/me", response_model = schemas.User)
async def get_user(user: schemas.User = fastapi.Depends(services.get_current_user)):
    return user

@app.get("/api/users/logout")
async def logout_user(response: Response):
    response.delete_cookie(key="access_token")


@app.get("/api/cards/all", response_model = List[schemas.Card])
async def get_cards(db: orm.Session = fastapi.Depends(services.get_db), user: schemas.User = fastapi.Depends(services.get_current_user)):
    return await services.get_cards(db)