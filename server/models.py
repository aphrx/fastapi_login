import sqlalchemy as _sql
import sqlalchemy.orm as _orm
import passlib.hash as _hash
import database as _db

class User(_db.Base):
    __tablename__ = "users"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    username = _sql.Column(_sql.String, unique=True, index=True)
    email = _sql.Column(_sql.String, unique=True, index=True)
    hashed_password = _sql.Column(_sql.String)

    def verify_password(self, password: str):
        return _hash.bcrypt.verify(password, self.hashed_password)

class Card(_db.Base):
    __tablename__ = "cards"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    card_content = _sql.Column(_sql.String, unique=True, index=True)
    card_rating = _sql.Column(_sql.Integer, unique=True)
    card_pack = _sql.Column(_sql.String)