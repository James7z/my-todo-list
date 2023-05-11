from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField


class LabelForm(FlaskForm):
    label_name = StringField("Label Name")
    user_id = IntegerField("user id")
