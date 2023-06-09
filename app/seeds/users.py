from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password')
    user2 = User(
        username='marnie', email='marnie@aa.io', password='password')
    user3 = User(
        username='bobbie', email='bobbie@aa.io', password='password')
    user4 = User(
        username='movieenjoyer', email='movies@aa.io', password='password')
    user5 = User(
        username='danielprogrammer', email='daniel@aa.io', password='password')
    user6 = User(
        username='normalaccount', email='normalaccount@aa.io', password='password')
    user7 = User(
        username='gamer', email='gamer@aa.io', password='password')
    user8 = User(
        username='throwaway-account', email='fake@aa.io', password='password')
    user9 = User(
        username='my-todo-list-official', email='official@aa.io', password='password')
    user10 = User(
        username='doglover123', email='dogs123@aa.io', password='password')

    users = [demo, user2, user3, user4, user5,
             user6, user7, user8, user9, user10]

    add_users = [db.session.add(user) for user in users]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
