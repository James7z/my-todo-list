from app.models import db, Task, Project
from app.forms import ProjectForm
from flask import Blueprint, request
from flask_login import login_required

from datetime import datetime

project_routes = Blueprint('projects', __name__)


# Get all projects route


@project_routes.route('/', methods=['GET'])
def get_projects():
    projects = Project.query.all()
    return [project.to_dict() for project in projects]


@project_routes.route('', methods=['GET'])
def get_tproject2():
    projects = Project.query.all()
    # print(projects)
    return [project.to_dict() for project in projects]


# Update project


@project_routes.route('/<int:project_id>', methods=['PUT'])
@login_required
def edit_project(project_id):

    form = ProjectForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    project = Project.query.get(project_id)

    if not project:
        return {"errors": ["Invalid Edit Request"]}

    if form.validate_on_submit():
        project.project_name = form.project_name.data
        project.color = form.color.data
        project.view_type = form.view_type.data

        project.updatedAt = datetime.now()

        db.session.commit()
        ret = Project.query.get(project_id)
        return ret.to_dict()

    if form.errors:
        return {"errors": form.errors}


# Delete project route


@project_routes.route('/<int:project_id>', methods=['DELETE'])
@login_required
def delete_project(project_id):
    project = Project.query.get(project_id)

    if not project:
        return {"errors": ["Invalid Delete Request"]}

    db.session.delete(project)
    db.session.commit()
    return {"project_id": project_id}


# Get tasks under an project


@project_routes.route('/<int:project_id>')
@login_required
def get_task_under_project(project_id):
    project = Project.query.get(project_id)

    if not project:
        return {"errors": ["Invalid Delete Request"]}

    return project.to_dict2()
