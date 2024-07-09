from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from config import db, bcrypt, app

class Teacher(db.Model, SerializerMixin):
    __tablename__ = 'teachers'

    serialize_rules = ('-_password_hash', '-reflections.teacher')

    __table_args__ = (
        db.CheckConstraint('length(username) > 3', name='username_length_over_3'),
    )

    id=db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String, nullable=False)
    last_name=db.Column(db.String, nullable=False)
    username=db.Column(db.String, unique=True, nullable=False)
    team=db.Column(db.String, nullable=False)
    _password_hash=db.Column(db.String, nullable=False)

    reflections = db.relationship('Reflection', back_populates='teacher', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<Teacher {self.id}: {self.first_name} {self.last_name}, {self.username}>"

    @property
    def password_hash(self):
        return self._password_hash 

    @password_hash.setter
    def password_hash(self, password):
        self._password_hash = bcrypt.generate_password_hash(password.encode('utf-8')).decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    
    @validates('first_name')
    def validate_first_name(self, key, new_first_name):
        if not new_first_name:
            raise ValueError("Your first name is required.")
        return new_first_name
    
    @validates('last_name')
    def validate_last_name(seld, key, new_last_name):
        if not new_last_name:
            raise ValueError("Your last name is required.")
        return new_last_name
    
    @validates('username')
    def validate_username(self, key, new_username):
        if not new_username:
            raise ValueError("A username is required.")
        if len(new_username) < 4:
            raise ValueError("Your username must be at least 4 characters.")
        if Teacher.query.filter_by(username=new_username).first():
            raise ValueError("That username is not available. Please try another username.")
        return new_username
    
    @validates('team')
    def validate_team(self, key, new_team):
        if not new_team:
            raise ValueError("Make sure to add your team.")
        return new_team
    
    @validates('_password_hash')
    def validates_password(self, key, new_password):
        if not new_password:
            raise ValueError("You must have a password.")
        if len(new_password) < 8:
            raise ValueError("Your password must be at least 8 characters.")
        if not any(char.isdigit() for char in new_password):
            raise ValueError("Your password must have at least one number.")
        return new_password

class Strategy(db.Model, SerializerMixin):
    __tablename__ = 'strategies'

    # serialize_rules = ('-description', '-instructions')

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, unique=True, nullable=False)
    description=db.Column(db.String)
    instructions=db.Column(db.Text)

    reflections = db.relationship('Reflection', back_populates='strategy', cascade='all, delete-orphan')

    def __repr__(self):
        return f"<Strategy {self.id}: {self.name}, {self.description}, {self.instructions}>"
    
    @validates("name")
    def validate_name(self, key, new_name):
        if not new_name:
            raise ValueError("Strategy name is required.")
        return new_name
    
class Reflection(db.Model, SerializerMixin):
    __tablename__ = "reflections"

    serialize_rules = ("-teacher.reflections", "-strategy.id", "-strategy.reflections")

    id=db.Column(db.Integer, primary_key=True)
    content=db.Column(db.Text, nullable=False)
    strategy_id=db.Column(db.Integer, db.ForeignKey('strategies.id'), nullable=False)
    teacher_id=db.Column(db.Integer, db.ForeignKey('teachers.id'), nullable=False)

    teacher = db.relationship('Teacher', back_populates='reflections')
    strategy = db.relationship('Strategy', back_populates='reflections')

    @property
    def strategy_name(self):
        return self.strategy.name if self.strategy else 'Unknown'
    
    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'strategy_id': self.strategy_id,
            'teacher_id': self.teacher_id,
            'strategy_name': self.strategy_name
        }


    def __repr__(self):
        return f"<Reflection {self.id}: strategy: {self.strategy_id}, teacher: {self.teacher_id}, refelction:{self.content}>"
    

