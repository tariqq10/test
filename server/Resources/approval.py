from flask_restful import Resource
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from functools import wraps
from models import db, Donation_request, Users
from Resources.roles import admin_required, donor_required


class DonationApprovalResource(Resource):
    @admin_required
    def patch(self, request_id):
        #find the donation request by ID
        donation_request = Donation_request.query.filter_by(request_id=request_id).first()
        #check if the donation already exists
        if donation_request is None:
            return {'message': 'Donation request not found'}, 404
        
        #check if the donation request is already approved 
        if donation_request.status == 'approved':
            return {'message': 'Donation request already approved'}, 200
        
        #update the status to approved
        donation_request.status = 'approved'
        
        try:
            db.session.commit()
            return {
                'message': 'Donation request approved successfully',
                'donation_request': donation_request.to_dict()
            }, 200
            
        except Exception as e:
            db.session.rollback()
            return {'message': 'Error approving the donation request', 'error': str(e)}, 500
        
    @admin_required   
    @donor_required
    def get(self):
        '''
        get the list of approved donation request for the donor.
        This will return all donation requests with the status 'approved'
        
        ''' 
        #query for all approved donation requests
        donation_requests = Donation_request.query.filter_by(status = 'approved').all()
        if not donation_requests :
            return {'message': 'No approved donation requests were found'}, 404
        
        approved_requests = [request.to_dict() for request in donation_requests]
        
        return {'approved_donations': approved_requests},200
        