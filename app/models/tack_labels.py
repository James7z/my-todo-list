from .db import db, environment, SCHEMA
from datetime import datetime
from app.models import Task, Label


class Task_label(db.Model):
    __tablename__ = 'task_labels'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    task_id = db.Column(db.Integer, db.ForeignKey(Task.id))
    label_id = db.Column(db.Integer, db.ForeignKey(Label.id))
