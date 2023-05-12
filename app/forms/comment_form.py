from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextAreaField


class CommentForm(FlaskForm):
    comment = TextAreaField("Comment")
    image_url = StringField("Image URL")
    user_id = IntegerField("user id")
    task_id = IntegerField("task id")
