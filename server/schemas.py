import pydantic as _pydantic

class _UserBase(_pydantic.BaseModel):
    username: str
    email: str

class UserCreate(_UserBase):
    hashed_password: str
    
    class Config:
        orm_mode = True

class User(_UserBase):
    id: int

    class Config:
        orm_mode = True

class _CardBase(_pydantic.BaseModel):
    card_content: str
    card_rating: int
    card_pack: str

class CardCreate(_CardBase):
    pass

class Card():
    id: int

    class Config:
        orm_mode = True