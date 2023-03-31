from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, db, Task, Project
from app.forms import TaskForm, ProjectForm
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
def get_user_tasks(id):
    user = User.query.get(id)
    tasks = user.tasks
    # tasks_unchecked = [task for task in tasks if task.checked == False]
    # return [task.to_dict() for task in tasks_unchecked]
    return {task.id: task.to_dict() for task in tasks}
# Create an user's task


@ user_routes.route('/<int:user_id>/tasks', methods=['POST'])
@ login_required
def create_user_task(user_id):
    # data = request.get_json()
    form = TaskForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    print('***************')
    print(form.project_id.data)

    if form.validate_on_submit():
        if form.project_id.data > 0:
            new_task = Task(
                task_name=form.task_name.data,
                description=form.description.data,
                priority=form.priority.data,
                due_date=form.due_date.data,
                project_id=form.project_id.data,
                user_id=user_id,
                createdAt=datetime.now(),
                updatedAt=datetime.now()
            )
        else:
            new_task = Task(
                task_name=form.task_name.data,
                description=form.description.data,
                priority=form.priority.data,
                due_date=form.due_date.data,
                user_id=user_id,
                createdAt=datetime.now(),
                updatedAt=datetime.now()
            )
    # new_task = Task(
    #     task_name=data["task_name"],
    #     description=data["description"],
    #     priority=data["priority"],
    #     due_date=data["due_date"],
    #     # due_date=datetime.now(),
    #     project_id=data["project_id"],
    #     user_id=user_id,
    #     createdAt=datetime.now(),
    #     updatedAt=datetime.now()
    # )
        db.session.add(new_task)
        db.session.commit()

        ret = Task.query.get(new_task.id)
        return ret.to_dict()

    if form.errors:
        return {"errors": form.errors}


# Get an user's projects

@user_routes.route('/<int:user_id>/projects')
@login_required
def get_user_projects(user_id):
    user = User.query.get(user_id)
    projects = user.projects
    # return [project.to_dict() for project in projects]
    return {project.id: project.to_dict() for project in projects}

# Create an user's project


@ user_routes.route('/<int:user_id>/projects', methods=['POST'])
@ login_required
def create_user_project(user_id):
    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_project = Project(
            project_name=form.project_name.data,
            color=form.color.data,
            view_type=form.view_type.data,
            user_id=user_id,
            createdAt=datetime.now(),
            updatedAt=datetime.now()
        )

        db.session.add(new_project)
        db.session.commit()

        ret = Project.query.get(new_project.id)
        return ret.to_dict()
