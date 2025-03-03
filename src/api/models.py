from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    actor = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(255), nullable=False)
    age = db.Column(db.Integer, nullable=False)

    
    def serialize(self):
        return {
            'id': self.id,
            'actor': self.actor,
            'country': self.country,
            'age': self.age,
        }
