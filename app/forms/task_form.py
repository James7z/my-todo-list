from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField


class TaskForm(FlaskForm):
    task_name = StringField("Name")
    description = StringField("Description")
    priority = IntegerField("priority")
    due_date = DateField("Due date")
    project_id = IntegerField("Project ID")
    label_ids = StringField("Labels")
