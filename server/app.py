#!/usr/bin/env python3

from flask import session, make_response, request
from flask_restful import Resource
from config import app, db, api
from models import Teacher, Strategy, Reflection

from sqlalchemy.exc import IntegrityError

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):
    def post(self):
        params = request.get_json()
        print(params)
        first_name = params.get('first_name')
        last_name = params.get('last_name')
        username = params.get('username')
        team = params.get('team')
        password = params.get('password')

        teacher = Teacher(
            first_name = first_name,
            last_name = last_name,
            username = username,
            team = team,
        )

        teacher.password_hash = password 
        
        try:
            db.session.add(teacher)
            db.session.commit()
            session['teacher_id'] = teacher.id
            return make_response(teacher.to_dict(), 201)
        except Exception as e:
            return make_response({'error': 'something went wrong'}, 400)

class CheckSession(Resource):
    def get(self):
        if 'teacher_id' in session:
            teacher_id = session.get('teacher_id')
            if teacher_id:
                teacher = db.session.get(Teacher, teacher_id)
                if teacher:
                    return make_response(teacher.to_dict(), 200)
        return make_response({'error': 'Unauthorized: must login'}, 401)

class Logout(Resource):
    def delete(self):
        print("loggin out")
        session['teacher_id'] = None
        return make_response({}, 204)

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


class Teachers(Resource):
    def get(self):
        all_teachers = []
        for teacher in Teacher.query.all():
            all_teachers.append(teacher.to_dict())

        return make_response(all_teachers)
    
    def post(self):
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

class TeacherById(Resource):
    def get(self, id):
        teacher = db.session.get(Teacher, id)
        if teacher:
            return make_response(teacher.to_dict())
        
    def patch(self, id):
        teacher = db.session.get(Teacher, id)
        if teacher:
            params = request.json
            for attr in params:
                setattr(teacher, attr, params[attr])
            db.session.commit()
            return make_response(teacher.to_dict())

    def delete(self, id):
        teacher = db.session.get(Teacher, id)
        if teacher:
            db.session.delete(teacher)
            db.session.commit()
            return make_response({'message': 'successfully deleted teacher'})

class TeacherReflections(Resource):
    def get(self, id):
        teacher = db.session.get(Teacher, id)
        if not teacher:
            return make_response({'error': 'Teacher not found.'}, 404)

        reflections = Reflection.query.filter_by(teacher_id=id).all()
        reflections_list = [reflection.to_dict() for reflection in reflections]

        return make_response(reflections_list, 200)

class Strategies(Resource):
    def get(self): 
        all_strategies = []
        for strategy in Strategy.query.all():
            all_strategies.append(strategy.to_dict())
        
        return make_response(all_strategies)
    
class StrategyReflections(Resource):
    def get(self, strategy_id):
        reflections = Reflection.query.filter_by(strategy_id=strategy_id).all()
        return make_response([reflection.to_dict() for reflection in reflections], 200)

class Reflections(Resource):
    def post(self):
        data = request.json
        content = data.get('content')
        strategy_id = data.get('strategy_id')
        teacher_id = session.get('teacher_id')

        if not content or not strategy_id or not teacher_id:
            return make_response({'error': 'Missing required fields'}, 400)
        
        reflection = Reflection(
            content=content,
            strategy_id=strategy_id,
            teacher_id=teacher_id
        )

        db.session.add(reflection)
        db.session.commit()

        return make_response(reflection.to_dict(), 201)
    
    def patch(self, reflection_id):
        reflection = db.session.get(Reflection, reflection_id)
        if reflection:
            data = request.json
            reflection.content = data.get('content', reflection.content)
            reflection.strategy_id = data.get('strategy_id', reflection.strategy_id)

            db.session.commit()

            return make_response(reflection.to_dict(), 200)
        else:
            return make_response({'error': 'Reflection not found.'}, 404)
        
    def delete(self, reflection_id):
        reflection = db.session.get(Reflection, reflection_id)
        if reflection:
            db.session.delete(reflection)
            db.session.commit()
            return make_response({'message': 'Reflection deleted.'}, 200)
        else:
            return make_response({'error': 'Reflection not found.'}, 404)


api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check-session')
api.add_resource(Logout, '/logout')
api.add_resource(Login, '/login')
api.add_resource(Teachers, '/teachers')
api.add_resource(TeacherById, '/teachers/<int:id>')
api.add_resource(TeacherReflections, '/teachers/<int:id>/reflections')
api.add_resource(Strategies, '/strategies')
api.add_resource(StrategyReflections, '/strategies/<int:strategy_id>')
api.add_resource(Reflections, '/reflections', '/reflections/<int:reflection_id>')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

