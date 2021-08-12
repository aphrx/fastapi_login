from pydantic import BaseModel

class _UserBase(BaseModel):
    email: str

class UserVerify(_UserBase):
    pass

class UserCreate(_UserBase):
    hashed_password: str
    
    class Config:
        orm_mode = True

class User(_UserBase):
    id: int
    username: str

    class Config:
        orm_mode = True
