from flask import Blueprint, request
from flask_login import login_required
from sqlalchemy.sql import text
from app.models import db, Task, Comment, User
from app.forms import CommentForm

from datetime import datetime

comment_routes = Blueprint('comments', __name__)

# Update label


@comment_routes.route('/<int:comment_id>', methods=['PUT'])
@login_required
def edit_comment(comment_id):

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    comment = Comment.query.get(comment_id)

    if not comment:
        return {"errors": ["Invalid Edit Request"]}

    if form.validate_on_submit():
        comment.comment = form.comment.data
        comment.image_url = form.image_url.data
        # comment.user_id = form.user_id.data
        comment.updatedAt = datetime.now()

        db.session.commit()
        ret = Comment.query.get(comment_id)
        return ret.to_dict()

    if form.errors:
        return {"errors": form.errors}


# Delete label route


@comment_routes.route('/<int:comment_id>', methods=['DELETE'])
@login_required
def delete_label(comment_id):
    comment = Comment.query.get(comment_id)

    if not comment:
        return {"errors": ["Invalid Delete Request"]}

    db.session.delete(comment)
    db.session.commit()
    return {"comment_id": comment_id}
