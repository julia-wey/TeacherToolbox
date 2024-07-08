#!/usr/bin/env python3

from config import app, db
from models import Teacher, Strategy, Reflection

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db

if __name__ == '__main__':
    #fake = Faker()
    with app.app_context():
        #Teacher.query.delete()
        #Reflection.query.delete()
        #Strategy.query.delete()
        #db.session.commit()

        t1= Teacher(first_name="Julia", last_name="Wey", username="jwey", team="Social Studies")
        t1.password_hash="password1"
        t2= Teacher(first_name="Dan", last_name="Burgoyne", username="dburgoyne", team="ELA")
        t2.password_hash="mypassword2"
        t3= Teacher(first_name="Debbie", last_name="Weys", username="dwey", team="Math")
        t3.password_hash="thepassword3"

        db.session.add_all([t1, t2, t3])
        db.session.commit()

        s1 = Strategy(name="Collaborative Annotation", description="Students respond to text together.", instructions="Using a text or a document...")
        s2 = Strategy(name="Written Conversation", description="Students pass each other notes.", instructions="In groups of three or 4, students respond to prompts in letter form to their group members. They each take turns responding to each prompt, and pass the notes around.")
        s3 = Strategy(name="Word, Phrase, Sentence", description="Text analysis tool", instructions="Students identify the most important word, phrase and sentence in each text, and discuss their choices.")
        s4 = Strategy(name="Quote, Comment, Question", description="Text analysis", instructions="Students select quotes from the text, write a comment regarding each quote, and a question about each quote. Prompts are given for commenting and questioning.")
        s5 = Strategy(name="Question Formulation Technique (QFT)", description="A tool to develop questions.", instructions="Students follow the protocol, working their way to thoughtful, open-ended questions.")

        db.session.add_all([s1, s2, s3, s4, s5])
        db.session.commit()

        r1 = Reflection(content="Such a great strategy", teacher_id=t1.id, strategy_id=s3.id)
        r2 = Reflection(content="Will use again.", teacher_id=t2.id, strategy_id=s1.id)
        r3 = Reflection(content="Was very useful with teaching writing skills.", teacher_id=t3.id, strategy_id=s2.id)

        db.session.add_all([r1, r2, r3])
        db.session.commit()

        
