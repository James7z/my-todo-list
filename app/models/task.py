from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime
from app.models import User, Project


task_labels = db.Table(
    'task_labels',
    db.Model.metadata,
    db.Column('task_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('tasks.id')), primary_key=True),
    db.Column('label_id', db.Integer, db.ForeignKey(
        add_prefix_for_prod('labels.id')), primary_key=True)
)

if environment == 'production':
    task_labels.schema = SCHEMA


class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    task_name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(2000))
    priority = db.Column(db.Integer, default=4)
    due_date = db.Column(db.DateTime, nullable=False, default=datetime.now())
    user_id = db.Column(db.Integer, db.ForeignKey(User.id))
    project_id = db.Column(db.Integer, db.ForeignKey(Project.id))
    checked = db.Column(db.Boolean, default=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    user = db.relationship("User", back_populates="tasks")
    project = db.relationship("Project", back_populates="tasks")
    comments = db.relationship("Comment", back_populates="task")
    labels = db.relationship(
        "Label",
        secondary="task_labels",
        back_populates="tasks"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "task_name": self.task_name,
            "description": self.description,
            "priority": self.priority,
            "due_date": self.due_date,
            "user_id": self.user_id,
            "project_id": self.project_id,
            "checked": self.checked,
            "createdAt": self.createdAt,
            "updatedAt": self.updatedAt,
            # "user": self.user.to_dict(),
            # "project": self.project.to_dict(),
        }
