#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import session, make_response, request
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import Teacher, Strategy, Reflection





@app.route('/')
def index():
    return '<h1>Project Server</h1>'

@app.route("/teachers", methods=["GET", "POST"])
def teachers():
    if request.method == "GET":
        all_teachers = []
        for teacher in Teacher.query.all():
            all_teachers.append(teacher.to_dict())
        return make_response(all_teachers)
    elif request.method == "POST":
        data = request.json

        new_teacher = Teacher(
            first_name=data["first_name"], 
            last_name=data["last_name"],
            username=data["username"],
            team=data["team"],
            _password_hash=data["_password_hash"]
        )

        db.session.add(new_teacher)
        db.session.commit()

        return make_response(new_teacher.to_dict(), 201)

@app.route('/login')
def login():
    return '<h1>Login</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)

