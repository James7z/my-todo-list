from app.models import db, Project, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
# color:  Red, Orange, Yellow, Blue, Green, Teal, Grey, Lavender
# view_type: List, Board
def seed_projects():
    project1 = Project(
        project_name='Homework', color='Yellow', view_type='List', user_id=1)

    project2 = Project(
        project_name='Solo Project', color='Blue', view_type='List', user_id=1)

    project3 = Project(
        project_name='Bills', color='Orange', view_type='List', user_id=1)

    project4 = Project(
        project_name='Habits', color='Yellow', view_type='List', user_id=1)

    project5 = Project(
        project_name='work', color='Red', view_type='List', user_id=2)

    project6 = Project(
        project_name='family', color='Green', view_type='List', user_id=2)

    project7 = Project(
        project_name='personal', color='Lavender', view_type='List', user_id=2)

    project8 = Project(
        project_name='Work', color='Blue', view_type='List', user_id=3)

    project9 = Project(
        project_name='To-Dos', color='Lavender', view_type='List', user_id=5)

    project10 = Project(
        project_name='Habits', color='Green', view_type='List', user_id=5)

    project11 = Project(
        project_name='Personal', color='Lavender', view_type='List', user_id=6)

    projects = [project1, project2, project3, project4, project5,
                project6, project7, project8, project9, project10, project11]

    add_projects = [db.session.add(project) for project in projects]

    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_projects():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.projects RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM projects"))

    db.session.commit()
