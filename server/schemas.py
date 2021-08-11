from pydantic import BaseModel

class _UserBase(BaseModel):
    email: str
    username: str

class UserVerify(_UserBase):
    pass

class UserCreate(_UserBase):
    hashed_password: str
    
    class Config:
        orm_mode = True

class User(_UserBase):
    id: int

    class Config:
        orm_mode = True

class _CardBase(BaseModel):
    card_content: str
    card_rating: int
    card_pack: str

class CardCreate(_CardBase):
    pass

class Card(_CardBase):
    id: int

    class Config:
        orm_mode = True