from app.models import db, Comment, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
# color:  Red, Orange, Yellow, Blue, Green, Teal, Grey, Lavender
# view_type: List, Board
def seed_comments():
    comment1 = Comment(
        comment='Demo Comment',
        image_url='https://thumbs.dreamstime.com/b/any-comments-written-white-chalk-blackboard-wooden-frame-held-woman-s-hands-against-blue-skies-43846759.jpg',
        user_id=1, task_id=2)

    comment2 = Comment(
        comment="Demo comment 2", user_id=1, task_id=2)

    comment3 = Comment(
        comment="In progress", user_id=1, task_id=3)

    comment4 = Comment(
        comment="Get some helps from TA", user_id=1, task_id=3)

    comment5 = Comment(
        comment="Will add more seed in next phase", user_id=1, task_id=5)

    comment6 = Comment(
        comment="Get some idea from previous project", user_id=1, task_id=6)

    comment7 = Comment(
        comment="Jurassic world 3? Lego movie 2?", user_id=1, task_id=8)

    comment8 = Comment(
        comment="GG", user_id=2, task_id=11)

    comment9 = Comment(
        comment="Florida Wildflower&Gargen Festival on March 25", user_id=2, task_id=14)

    comment10 = Comment(
        comment="Share result with Alice", user_id=4, task_id=17)

    comments = [comment1, comment2, comment3, comment4, comment5,
                comment6, comment7, comment8, comment9, comment10]

    add_comments = [db.session.add(comment) for comment in comments]
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
