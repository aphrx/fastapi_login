from sqlalchemy import Column, Integer, String
import passlib.hash as hash
import database as db

class User(db.Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

    def verify_password(self, password: str):
        return hash.bcrypt.verify(password, self.hashed_password)

class Card(db.Base):
    __tablename__ = "cards"
    id = Column(Integer, primary_key=True, index=True)
    card_content = Column(String, unique=True, index=True)
    card_rating = Column(Integer, unique=True)
    card_pack = Column(String)