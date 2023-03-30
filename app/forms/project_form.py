from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField


class ProjectForm(FlaskForm):
    project_name = StringField("Project Name")
    view_type = StringField("View type")
    color = StringField("Color")
    user_id = IntegerField("user id")
