from app.models import db, Task, Label
from app.forms import LabelForm
from flask import Blueprint, request
from flask_login import login_required

from datetime import datetime

label_routes = Blueprint('labels', __name__)


# Get all labels route


@label_routes.route('', methods=['GET'])
def get_labels():
    labels = Label.query.all()
    return [label.to_dict() for label in labels]


# Update label

@label_routes.route('/<int:label_id>', methods=['PUT'])
@login_required
def edit_label(label_id):

    form = LabelForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    label = Label.query.get(label_id)

    if not label:
        return {"errors": ["Invalid Edit Request"]}

    if form.validate_on_submit():
        label.label_name = form.label_name.data
        label.updatedAt = datetime.now()

        db.session.commit()
        ret = Label.query.get(label_id)
        return ret.to_dict()

    if form.errors:
        return {"errors": form.errors}


# Delete label route


@label_routes.route('/<int:label_id>', methods=['DELETE'])
@login_required
def delete_label(label_id):
    label = Label.query.get(label_id)

    if not label:
        return {"errors": ["Invalid Delete Request"]}

    db.session.delete(label)
    db.session.commit()
    return {"label_id": label_id}

# Get a single label


@label_routes.route('/<int:label_id>')
@login_required
def get_single_label(label_id):
    label = Label.query.get(label_id)

    if not label:
        return {"errors": ["Invalid Get Request"]}
    return label.to_dict()

# Get tasks under an label


@label_routes.route('/<int:label_id>/tasks')
@login_required
def get_task_under_label(label_id):
    label = Label.query.get(label_id)

    if not label:
        return {"errors": ["Invalid Get Request"]}

    tasks = label.tasks
    return {task.id: task.to_dict() for task in tasks}
