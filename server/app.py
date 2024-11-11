from flask import Flask
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_cors import CORS
import os
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from datetime import timedelta
from flask_restful import Api
from models import db, Users, Organizations, Donation_request, Categories, Donations, Reports
from Resources.auth import UserResource, LoginResource, LogoutResource 
from Resources.category import CategoryResource
from Resources.organization import OrganizationResource
from Resources.request import DonationRequestResource
from Resources.donations import DonationResource
from Resources.approval import DonationApprovalResource, ApprovedDonationResource
from Resources.report import ReportResource



#load enviroment variables from .env file
load_dotenv()

#create a flask instance
app = Flask(__name__)

#set up CORS for cross-origin requests
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")
app.config['SQLALCHEMY_ECHO'] = True  # Allow SQLAlchemy to log SQL queries
app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET_KEY')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=30)

#intergrate flask-RESTFUL extensions
api = Api(app)
jwt = JWTManager(app)
#create the migrate object to manage migrations
migrate = Migrate(app, db)
#link our db to the flask instance
db.init_app(app)


api.add_resource(UserResource, '/users', '/users/<int:user_id>')
api.add_resource(LoginResource, '/login')
api.add_resource(LogoutResource, '/logout')
api.add_resource(CategoryResource, '/categories', '/categories/<int:id>')
api.add_resource(OrganizationResource, '/organizations', '/organizations/<int:id>')
api.add_resource(DonationRequestResource, '/requests', '/requests/<int:id>')
api.add_resource(DonationResource, '/donations', '/donations/<int:id>')
api.add_resource(DonationApprovalResource, '/approvals', '/approvals/<int:request_id>')
api.add_resource(ApprovedDonationResource, '/approved')
api.add_resource(ReportResource, '/reports')
api.add_resource(ReportResource, '/reports/user/<int:user_id>', endpoint="user_donations")




if __name__ == '__main__':
    # create_admin_user() # Create admin user if it doesn't exist
    app.run(debug=True)
