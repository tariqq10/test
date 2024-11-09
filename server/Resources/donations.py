from flask_restful import Resource, reqparse
from models import Donations, db
from flask import request
from Resources.roles import donor_required, ngo_required

class DonationResource(Resource):
    parser = reqparse.RequestParser()
    parser.add_argument('amount', type=float, default=0.00, help='amount is required for donation')
    parser.add_argument('user_id', type=int, required=True, help = 'User ID is required')
    parser.add_argument('category_id', type=int, required=True, help = 'Category ID is required')
    
    
    @donor_required
    def get(self, id=None):
        if id is None:
            all_donations = Donations.query.all()
            return [donation.to_dict() for donation in all_donations], 200 #serializing each donation
        donation = Donations.query.filter_by(donation_id=id).first()
        if donation is None:
            return {"message": "Donation not found"}, 404
        return donation.to_dict(), 200
    
    @donor_required
    def post(self):
        data = self.parser.parse_args()
        
        try:
            #create a new product
            donation = Donations(**data)
            
            #save the donation to the database
            db.session.add(donation)
            db.session.commit()
            return {"message": "donation saved successfully",
                    "donation": donation.to_dict()
                    }, 201
            
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
        
        
        
    