from app.models import db, Label, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
# color:  Red, Orange, Yellow, Blue, Green, Teal, Grey, Lavender
# view_type: List, Board
def seed_labels():
    label1 = Label(label_name='Demo-label', user_id=1)
    label2 = Label(label_name='Read', user_id=1)
    label3 = Label(label_name='Project', user_id=1)
    label4 = Label(label_name='Demo-label2', user_id=1)
    label5 = Label(label_name='Work', user_id=5)
    label6 = Label(label_name='Meeting', user_id=2)
    label7 = Label(label_name='Relax', user_id=2)
    label8 = Label(label_name='Test', user_id=2)
    label9 = Label(label_name='Work', user_id=4)
    label10 = Label(label_name='Family', user_id=4)
    label11 = Label(label_name='Reward', user_id=4)

    labels = [label1, label2, label3, label4, label5,
              label6, label7, label8, label9, label10, label11]

    add_labels = [db.session.add(label) for label in labels]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_labels():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.labels RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM labels"))

    db.session.commit()
