from models import db, Donation_request, Organizations
from flask_restful import Resource, reqparse
from flask import request



class DonationRequestResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('title', type=str, help = 'title of the donation is required')
    parser.add_argument('description', type=str, help = 'description of the donation is required')
    parser.add_argument('status', type=str, help = 'status of the donation is required')
    parser.add_argument('target_amount', type=float, help = 'amount of the donation is required')
    parser.add_argument('organization_id', type=int, help='organization_id of the request is required')
    parser.add_argument('category_id', type=int, required=True, help = 'category_id of the request is required')
    
    
    def get(self, id=None):
        if id is None:
            all_requests = Donation_request.query.all()
            return [request.to_dict() for request in all_requests], 200
        request = Donation_request.query.filter_by(request_id=id)
        if request.first() is None:
            return {'message': 'Request not found'}, 404
        return request.first().to_dict(), 200
    
    def post(self):
        data = self.parser.parse_args()
        
        try: 
            #create a new donation request
            donation_request = Donation_request(**data)
            
            
            #fetch the donation request from the database to check if the donation request being posted already exists
            donation_requests = Donation_request.query.all()
            for request in donation_requests:
                if request.title == data['title'] and request.description == data['description'] and request.target_amount == data['target_amount'] and request.organization_id == data['organization_id'] and request.category_id == data['category_id']:
                    return {'message': 'Donation request already exists'}, 400
            db.session.add(donation_request)
            db.session.commit()
            return donation_request.to_dict(), 201
        except Exception as e:
            db.session.rollback()
            return {'message': "error creating the category", "error": str(e)}, 500
        
    def patch(self, id):
        data = self.parser.parse_args()
        
        # Find the donation request by its ID
        request = Donation_request.query.filter_by(request_id=id).first()
        
        if request is None:
            return {'message': 'Request not found'}, 404
        
        # Initialize a flag to track if any changes were made
        changes_made = False
        response_message = []
        
        # Update the title if it's provided and different from the current title
        if 'title' in data and data['title'] is not None:
            if request.title!= data['title']:
                request.title = data['title']
                changes_made = True
                response_message.append("Title updated successfully")
            else:
                response_message.append("Title is already up to date")
                
        # Update the description if it's provided and different from the current description
        if 'description' in data and data['description'] is not None:
            if request.description!= data['description']:
                request.description = data['description']
                changes_made = True
                response_message.append("Description updated successfully")
            else:
                response_message.append("Description is already up to date")
                
        #update the target if it's provided and different from the current target_amount
        if 'target_amount' in data and data['target_amount'] is not None:
            if request.target_amount!= data['target_amount']:
                request.target_amount = data['target_amount']
                changes_made = True
                response_message.append("Target amount updated successfully")
            else:
                response_message.append("Target amount is already up to date")
                
        # Update the status if it's provided and different from the current status
        if'status' in data and data['status'] is not None:
            if request.status!= data['status']:
                request.status = data['status']
                changes_made = True
                response_message.append("Status updated successfully")
            else:
                response_message.append("Status is already up to date")
                
        try:
            if changes_made:
                db.session.commit()
                return {
                    "message": "donation_request updated successfully",
                    "message": response_message,
                    "donation_request": request.to_dict()
                    }, 200
            else:
                return {"message": "No changes made"}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': "error updating the donation_request", "error": str(e)}, 500
        
    def delete(self, id):
        request = Donation_request.query.filter_by(request_id=id).first()
        
        if request is None:
            return {'message': 'Request not found'}, 404
        
        try:
            db.session.delete(request)
            db.session.commit()
            return {'message': 'Donation request deleted successfully',
                    "request": request.to_dict()
                    }, 202
        except Exception as e:
            db.session.rollback()
            return {'message': "error deleting the donation_request", "error": str(e)}, 500
        
            
        
        
    
    
    
    
