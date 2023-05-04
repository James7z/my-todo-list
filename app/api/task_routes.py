from flask import Blueprint, request
from flask_login import login_required
from sqlalchemy.sql import text
from app.models import db, Task, Comment, User
from app.forms import TaskForm,  CommentForm

from datetime import datetime

task_routes = Blueprint('tasks', __name__)

# Get all tasks route


@task_routes.route('/', methods=['GET'])
def get_tasks():
    tasks = Task.query.all()
    print(tasks)
    return [task.to_dict() for task in tasks]


@task_routes.route('', methods=['GET'])
def get_tasks2():
    tasks = Task.query.all()
    # print(tasks)
    return [task.to_dict() for task in tasks]

# Check a task


@task_routes.route('/check/<int:task_id>', methods=['PUT'])
@login_required
def check_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return {"errors": ["Invalid Edit Request"]}

    task.checked = not task.checked
    task.updatedAt = datetime.now()

    db.session.commit()
    ret = Task.query.get(task_id)
    return ret.to_dict()


# Update task
@task_routes.route('/<int:task_id>', methods=['PUT'])
@login_required
def edit_task(task_id):

    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    task = Task.query.get(task_id)

    if not task:
        return {"errors": ["Invalid Edit Request"]}

    if form.validate_on_submit():
        task_name = form.task_name.data
        description = form.description.data
        priority = form.priority.data
        due_date = form.due_date.data
        project_id = form.project_id.data

        task.task_name = task_name
        task.description = description
        task.priority = priority
        task.due_date = due_date
        task.project_id = project_id

        task.updatedAt = datetime.now()

        db.session.commit()
        ret = Task.query.get(task_id)
        return ret.to_dict()

    if form.errors:
        return {"errors": form.errors}


# Delete task route


@task_routes.route('/<int:task_id>', methods=['DELETE'])
@login_required
def delete_task(task_id):
    task = Task.query.get(task_id)

    if not task:
        return {"errors": ["Invalid Delete Request"]}

    db.session.delete(task)
    db.session.commit()
    return {"id": task_id}


# Get task comments
@task_routes.route('/<int:task_id>/comments', methods=['GET'])
@login_required
def get_task_comments(task_id):

    task = Task.query.get(task_id)
    if not task:
        return {"errors": ["Invalid Get Request"]}

    comments = task.comments

    return {comment.id: comment.to_dict() for comment in comments}

# Create task comment


@task_routes.route('/<int:task_id>/comments', methods=['POST'])
@login_required
def create_task_comments(task_id):
    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_comment = Comment(
            comment=form.comment.data,
            image_url=form.image_url.data,
            user_id=form.user_id.data,
            task_id=task_id,
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        )

        db.session.add(new_comment)
        db.session.commit()

        ret = Comment.query.get(new_comment.id)
        return ret.to_dict()
