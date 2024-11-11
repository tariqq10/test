from flask_restful import Resource, reqparse
from models import Donations,Donation_request, db
from flask import request
from Resources.roles import donor_required, ngo_required
from flask_jwt_extended import get_jwt_identity, jwt_required

class DonationResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('amount', type=float, default=0.00, help='Amount is required for donation')
  
    parser.add_argument('donation_request_id', type=int, required=True, help='Donation Request ID is required')  # Add this line

    @donor_required
    def get(self, id=None):
        #fetch user ID from JWT token
        user_id = get_jwt_identity()
        if id is None:
            
            user_donations = Donations.query.filter_by(user_id=user_id).all()
            if not user_donations:
                return {"message": "No donations found for this user"},404
            return [donation.to_dict() for donation in user_donations],200
        
        donation = Donations.query.filter_by(donation_id = id, user_id=user_id).first()
        if donation is None:
            return {"message": "Donation not found for this user"}, 404
        return donation.to_dict(), 200
                
            
        #     all_donations = Donations.query.all()
        #     return [donation.to_dict() for donation in all_donations], 200
        # donation = Donations.query.filter_by(donation_id=id).first()
        # if donation is None:
        #     return {"message": "Donation not found"}, 404
        # return donation.to_dict(), 200
    @donor_required
    def post(self):
        # Parse the 'amount' field only, as other fields will be auto-assigned
        data = self.parser.parse_args()
        amount = data.get('amount')

        # Retrieve the user ID from the JWT token
        user_id = get_jwt_identity()

        # Get donation_request_id and category_id from the JSON body (e.g., selected by user in frontend)
        request_data = request.get_json()
        donation_request_id = request_data.get('donation_request_id')
        
        # Fetch the donation request by its ID
        donation_request = Donation_request.query.filter_by(request_id=donation_request_id).first()

        # Check if the donation request exists and is approved
        if donation_request is None:
            return {"message": "Donation request not found"}, 404
        if donation_request.status != "approved":
            return {"message": "Donation request must be approved first in order to be eligible for donation"}, 400
        
        # Set category_id from the donation_request object
        category_id = donation_request.category_id

        # Create the new donation entry with the assigned fields
        donation = Donations(
            amount=amount,
            user_id=user_id,
            category_id=category_id,
            donation_request_id=donation_request_id
        )

        try:
            # Save the donation to the database
            db.session.add(donation)
            db.session.commit()
            return {"message": "Donation saved successfully", "donation": donation.to_dict()}, 201

        except Exception as e:
            db.session.rollback()
            return {"message": "Error creating the donation", "error": str(e)}, 500


    @donor_required 
    def patch(self, id):
        data = self.parser.parse_args()
        
        # Fetch the donation by its ID
        donation = Donations.query.filter_by(donation_id=id).first()
        
        if donation is None:
            return {"message": "Donation not found"}, 404
        
        # Initialize a flag to track if any changes were made
        changes_made = False
        response_message = []
        
        # Update the donation details
        if 'amount' in data and data['amount'] is not None:
            if donation.amount != data['amount']:
                donation.amount = data['amount']
                changes_made = True
                response_message.append("Amount updated successfully")
            else:
                response_message.append("Amount is already up to date")
                    
        try:
            if changes_made:
                db.session.commit()
                return {
                    "message": "Donation updated successfully",
                    "donation": donation.to_dict(),
                    "details": response_message
                }, 200
            else:
                return {
                    "message": "No changes made to the donation",
                    "details": response_message
                }, 304  # 304 Not Modified indicates no changes were applied
            
        except Exception as e:
            db.session.rollback()
            return {"message": "Error updating the donation", "error": str(e)}, 500

      
    def delete(self, id):
        donation = Donations.query.filter_by(donation_id=id).first()
        
        if donation is None:
            return {"message": "Donation not found"}, 404
        
        try:
            donation_data = donation.to_dict()
            db.session.delete(donation)
            db.session.commit()
            return {
                "message": "Donation deleted successfully",
                "donation": donation_data
                }, 200
        except Exception as e:
            db.session.rollback()
            return {"message": "Error deleting the donation", "error": str(e)}, 500
        
        
        
    