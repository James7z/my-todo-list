from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db, Task
from app.forms import TaskForm
from datetime import datetime

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

# Get an user's tasks


@user_routes.route('/<int:id>/tasks')
@login_required
def user_tasks(id):
    user = User.query.get(id)
    tasks = user.tasks
    return [task.to_dict() for task in tasks]


# Create an user's task
@ user_routes.route('/<int:user_id>/tasks', methods=['POST'])
@ login_required
def create_user_task(user_id):
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        task_name = form.task_name.data
        description = form.description.data
        priority = form.priority.data
        due_date = form.due_date.data
        project_id = form.project_id.data

        new_task = Task(
            task_name=task_name,
            description=description,
            priority=priority,
            due_date=due_date,
            user_id=user_id,
            project_id=project_id,
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        )
        db.session.add(new_task)
        db.session.commit()

        ret = Task.query.get(new_task.id)
        return ret.to_dict()

    if form.errors:
        return {"errors": form.errors}
