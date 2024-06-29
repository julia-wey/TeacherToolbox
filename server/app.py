#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from config import app, db, api
from models import Teacher, Strategy, Reflection



class Login(Resource)

@app.route('/')
def index():
    return '<h1>Project Server</h1>'


@app.route('/login')
def index():
    return '<h1>Login</h1>'

if __name__ == '__main__':
    app.run(port=5555, debug=True)

