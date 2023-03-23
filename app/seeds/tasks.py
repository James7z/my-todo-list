from app.models import db, Task, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime


def seed_tasks():
    task1 = Task(
        task_name='Test Task 1',
        description="My first task in MyTodoList app",
        priority=4,
        due_date=datetime.now(),
        user_id=1,
        project_id=None,
        checked=True
    )

    task2 = Task(
        task_name='Demo Task 2',
        description="Demo task 2",
        priority=3,
        due_date=datetime.now(),
        user_id=1,
        project_id=1,
    )

    task3 = Task(
        task_name='Review Flask',
        description="Review Flask",
        priority=4,
        due_date=datetime.now(),
        user_id=1,
        project_id=1,
    )

    task4 = Task(
        task_name='Data Model',
        description="",
        priority=2,
        due_date=datetime.now(),
        user_id=1,
        project_id=2,
    )

    task5 = Task(
        task_name='Seed data',
        description="Prepare seed data for the project",
        priority=2,
        due_date=datetime.now(),
        user_id=1,
        project_id=2,
    )

    task6 = Task(
        task_name='Backend route 1',
        description="Backend route for 1st feature",
        priority=2,
        due_date=datetime.now(),
        user_id=1,
        project_id=2,
    )

    task7 = Task(
        task_name='Water fee',
        description="",
        priority=1,
        due_date=datetime.now(),
        user_id=1,
        project_id=3,
    )
    task8 = Task(
        task_name='Movie night',
        description="",
        priority=3,
        due_date=datetime.now(),
        user_id=1,
        project_id=3,
    )
    task9 = Task(
        task_name='Commic Books',
        description="Commic Books",
        priority=4,
        due_date=datetime.now(),
        user_id=1,
        project_id=4,
    )

    task10 = Task(
        task_name='1:1 Meeting with David',
        description="",
        priority=3,
        due_date=datetime.now(),
        user_id=2,
        project_id=5,
    )
    task11 = Task(
        task_name='Boardgame night',
        description="",
        priority=4,
        due_date=datetime.now(),
        user_id=2,
        project_id=6,
    )
    task12 = Task(
        task_name='Product demo',
        description="Email product demo to Mark",
        priority=1,
        due_date=datetime.now(),
        user_id=2,
        project_id=5,
    )

    task13 = Task(
        task_name='1:1 Meeting',
        description="1:1 Meeting with Manager",
        priority=1,
        due_date=datetime.now(),
        user_id=3,
        project_id=8,
    )

    task14 = Task(
        task_name='Search for local art show',
        description="",
        priority=3,
        due_date=datetime.now(),
        user_id=2,
        project_id=7,
    )

    task15 = Task(
        task_name='Internet fee',
        description="Pay internet fee",
        priority=2,
        due_date=datetime.now(),
        user_id=5,
        project_id=9,
    )

    task16 = Task(
        task_name='Answer customer support tickets',
        description="",
        priority=2,
        due_date=datetime.now(),
        user_id=4,
        project_id=None,
    )

    task17 = Task(
        task_name='Summarize customer surveys',
        description="Pay internet fee",
        priority=1,
        due_date=datetime.now(),
        user_id=4,
        project_id=None,
    )

    task18 = Task(
        task_name='Review competitor analysis',
        description="",
        priority=3,
        due_date=datetime.now(),
        user_id=5,
        project_id=10,
    )

    task19 = Task(
        task_name='Clean driveway',
        description="",
        priority=3,
        due_date=datetime.now(),
        user_id=6,
        project_id=11,
    )

    task20 = Task(
        task_name='Shop for groceries',
        description="milk, eggs, break, lettuce, banana",
        priority=3,
        due_date=datetime.now(),
        user_id=6,
        project_id=11,
    )

    tasks = [task1, task2, task3, task4, task5, task6, task7, task8, task9,
             task10, task11, task12, task13, task14, task15, task16, task17, task18, task19, task20]

    add_tasks = [db.session.add(task) for task in tasks]

    db.session.commit()


def undo_tasks():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.tasks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tasks"))

    db.session.commit()
