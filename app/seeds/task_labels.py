from app.models import db, Task, Label, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
# color:  Red, Orange, Yellow, Blue, Green, Teal, Grey, Lavender
# view_type: List, Board
def seed_task_labels():
    tasks = []
    for i in range(1, 11):
        task = Task.query.get(i)
        tasks.append(task)

    labels = []
    for i in range(1, 11):
        label = Label.query.get(i)
        labels.append(label)

    tasks[0].task_labels.append(labels[0])
    tasks[0].task_labels.append(labels[1])
    tasks[1].task_labels.append(labels[1])

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_task_labels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.task_labels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM task_labels"))

    db.session.commit()
