from .db import db, environment, SCHEMA
from datetime import datetime
from app.models import User


class Label(db.Model):
    __tablename__ = 'labels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    label_name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    labeled_tasks = db.relationship(
        "Task",
        secondary="task_labels",
        back_populates="task_labels"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "label_name": self.label_name,
            "user_id": self.user_id,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
        }
