from sqlalchemy.sql.functions import user
from fastapi import Depends, HTTPException
from fastapi.responses import Response
from utils import OAuth2PasswordBearerWithCookie
from sqlalchemy.orm import Session
from passlib.hash import bcrypt
import database
import models
import schemas
import jwt

oauth2schema = OAuth2PasswordBearerWithCookie(tokenUrl="/api/token")

JWT_SECRET = "2f977d4a840e166bac6e2bb92957cb52b2e315aa969352520c7f318fa9446696"
ALGORITHM = ["HS256"]

def create_database():
    return database.Base.metadata.create_all(bind=database.engine)

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
       db.close() 

async def get_user_by_email(email: str, db: Session):
    return db.query(models.User).filter(models.User.email == email).first()

async def get_user_by_username(username: str, db: Session):
    return db.query(models.User).filter(models.User.username == username).first()

async def create_user(user: schemas.UserCreate, db: Session):
    user_obj = models.User(username=user.username, email=user.email, hashed_password=bcrypt.hash(user.hashed_password))
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj

async def authenticate_user(email: str, password: str, db: Session):
    user = await get_user_by_email(email, db)

    if not user or not user.verify_password(password):
        return False

    return user

async def create_token(user: models.User):
    user_obj = schemas.User.from_orm(user)
    token = jwt.encode(user_obj.dict(), JWT_SECRET)
    return dict(access_token=token, token_type="bearer")

async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2schema)):
    try:
        payload = jwt.decode(token, JWT_SECRET, ALGORITHM)
        user = db.query(models.User).get(payload['id'])
    except:
        raise HTTPException(status_code=401, detail="Invald credentials")

    return schemas.User.from_orm(user)