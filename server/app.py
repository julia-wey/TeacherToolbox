#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import session, make_response, request, jsonify
from flask_restful import Resource, Api
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
        return make_response(jsonify(all_teachers))
    elif request.method == "POST":
        data = request.json

        new_teacher = Teacher(
            first_name=data["first_name"], 
            last_name=data["last_name"],
            username=data["username"],
            team=data["team"],
            password=data["password"]
        )

        db.session.add(new_teacher)
        db.session.commit()

        return make_response(jsonify(new_teacher.to_dict()), 201)
@app.before_request
def check_log_status():
    open_access_list = [
        'login',
        'check_session'
    ]
    if request.endpoint not in open_access_list and (not session.get('teacher_id')):
        return make_response({"error": "401 Unauthorized"}, 401)

class Login(Resource):
    def post(self):
        if request.content_type != 'application/json':
            return make_response({"message": "Content-Type must be application/json"}, 400)
        params = request.get_json()
        teacher = Teacher.query.filter_by(username=params.get("username")).first()
        if not teacher:
            return make_response({'error': 'teacher not found'}, 404)
        if teacher.authenticate(params.get('password')):
            session['teacher_id'] = teacher.id
            return make_response(teacher.to_dict())
        else:
            return make_response({"error": "Invalid password."}, 401)

class Logout(Resource):
    def delete(self):
        print("loggin out")
        session.pop('teacher_id', None)
        return make_response({}, 204)

class CheckSession(Resource):
    def get(self):
        if 'teacher_id' in session:
            teacher_id = session['teacher_id']
            if teacher_id:
                teacher = db.session.get(Teacher, teacher_id)
                if teacher:
                    return make_response(teacher.to_dict(), 200)
        return make_response({"error": "Unauthorized: must login"}, 401)



api = Api(app)
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout', endpoint='logout')
api.add_resource(CheckSession, '/check-session', endpoint='check-session')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

