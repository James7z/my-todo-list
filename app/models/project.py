from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from app.models import User


class Project(db.Model):
    __tablename__ = 'projects'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    project_name = db.Column(db.String(50), nullable=False)
    color = db.Column(db.String(10), nullable=False)
    view_type = db.Column(db.String(10), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    tasks = db.relationship("Task", back_populates="project")
    user = db.relationship("User", back_populates="projects")

    def to_dict(self):
        return {
            "id": self.id,
            "project_name": self.project_name,
            "color": self.color,
            "view_type": self.view_type,
            "user_id": self.user_id,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
