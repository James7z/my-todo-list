from app.models import db, Task_label, Label, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
# color:  Red, Orange, Yellow, Blue, Green, Teal, Grey, Lavender
# view_type: List, Board
def seed_task_labels():
    task_label1 = Task_label(task_id=1, label_id=1)
    task_label2 = Task_label(task_id=1, label_id=2)
    task_label3 = Task_label(task_id=2, label_id=1)

    task_labels = [task_label1, task_label2, task_label3]

    add_task_labels = [db.session.add(task_label)
                       for task_label in task_labels]

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
