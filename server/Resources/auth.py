from flask import request
from flask_restful import Resource, reqparse
from models import db, Users
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask_bcrypt import generate_password_hash, check_password_hash


class UserResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('first_name', type=str, required=True, help='first_name is required')
    parser.add_argument('last_name', type=str, required=True, help='last_name is required')
    parser.add_argument('email', type=str, required=True, help='email is required')
    parser.add_argument('phone', type=str, required=True, help='phone number is required')
    parser.add_argument('role', type=str, required=True, help='role is required')
    parser.add_argument('password', type=str, required=True, help='password is required')
    parser.add_argument('confirm_password', type=str, required=True, help='confirm_password is required')
    
    def post(self):
        data = self.parser.parse_args()

        # 1. Verify the phone, password, and email if they are unique
        existing_number = Users.query.filter_by(phone=data['phone']).first()
        if existing_number:
            return {'message': 'Phone number already exists'}, 422
        
        existing_email = Users.query.filter_by(email=data['email']).first()
        if existing_email:
            return {'message': 'Email already exists'}, 422
        
        # 2. Verify the password and confirm password match
        if data['password'] != data['confirm_password']:
            return {'message': 'Passwords do not match'}, 422
        
        # 3. Hash the password
        hashed_password = generate_password_hash(data['password']).decode('utf8')

        # 4. Only allow setting 'admin' role if the user is an existing admin (optional)
        # Check if an admin user is creating a new user and if the 'admin' role is being set
        if data['role'] == 'admin':
            # Add additional logic to check if the request comes from an admin user (Optional)
            current_user_id = get_jwt_identity()  # Get the ID of the logged-in user (admin)
            current_user = Users.query.get(current_user_id)
            if current_user is None or current_user.role != 'admin':
                return {'message': 'Only admins can assign admin roles'}, 403

        # Save the user to the database
        user = Users(first_name=data['first_name'], 
                     last_name=data['last_name'], 
                     email=data['email'], 
                     phone=data['phone'],
                     role=data['role'], 
                     password=hashed_password)
        db.session.add(user)
        db.session.commit()
        
        # Generate access token
        access_token = create_access_token(identity=user.user_id)
        
        return {
            'access_token': access_token,
            'user': user.to_dict(),
            'message': 'User created successfully'
        }, 201


class LoginResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('email', type=str, required=True, help='email is required')
    parser.add_argument('password', type=str, required=True, help='password is required')
    
    def post(self):
        data = self.parser.parse_args()
        user = Users.query.filter_by(email=data['email']).first()
        if user is None:
            return {'message': 'Invalid credentials'}, 401
        
        # Verify the password
        if check_password_hash(user.password, data['password']):
            access_token = create_access_token(identity=user.user_id)
            
            return {
                'access_token': access_token,
                'user': user.to_dict(),
                'message': 'Logged in successfully'
            }, 200
        else:
            return {'message': 'Invalid credentials'}, 401


# If you want to add an endpoint that only admins can access:
class AdminOnlyResource(Resource):
    @jwt_required()  # Make sure the user is logged in
    def get(self):
        # Get the logged-in user's ID
        current_user_id = get_jwt_identity()
        user = Users.query.get(current_user_id)
        
        # Check if the user is an admin
        if user and user.role == 'admin':
            return {'message': 'Welcome, admin! You have access to this resource.'}, 200
        else:
            return {'message': 'Access denied. Admins only.'}, 403  # Forbidden if not admin
