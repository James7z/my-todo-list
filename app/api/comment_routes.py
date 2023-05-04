from flask import Blueprint, request
from flask_login import login_required
from sqlalchemy.sql import text
from app.models import db, Task, Comment, User
from app.forms import TaskForm

from datetime import datetime

comment_routes = Blueprint('comments', __name__)
