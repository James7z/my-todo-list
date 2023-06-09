from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    projects = db.relationship("Project", back_populates="user")
    tasks = db.relationship("Task", back_populates="user")
    comments = db.relationship("Comment",  back_populates="user")
    labels = db.relationship("Label", back_populates="user")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def to_dict2(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'projects': [project.to_dict() for project in self.projects],
            'labels': [label.to_dict() for label in self.labels],

        }
