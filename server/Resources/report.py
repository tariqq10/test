# from flask_restful import Resource
# from models import Donations, db, Reports
# from sqlalchemy import func
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from datetime import datetime

# class ReportResource(Resource):

#     @jwt_required()
#     def get(self):
#         """
#         Get summarized report including:
#         - Total donations
#         - Total pending donations
#         - Donations by category
#         """
#         try:
#             # Total donations amount
#             total_donations = db.session.query(func.sum(Donations.amount)).scalar() or 0.0

#             # Total pending donations (those without 'approved' status)
#             pending_donations = db.session.query(func.sum(Donations.amount)) \
#                 .join(Donations.donation_request) \
#                 .filter(Donations.status != 'approved') \
#                 .scalar() or 0.0

#             # Donations by category
#             donations_by_category = db.session.query(
#                 Donations.category_id,
#                 func.sum(Donations.amount).label("total_amount")
#             ).group_by(Donations.category_id).all()

#             # Format donations by category as a dictionary for easy serialization
#             donations_by_category_dict = [
#                 {"category_id": category_id, "total_amount": total_amount}
#                 for category_id, total_amount in donations_by_category
#             ]

#             # Prepare the report data
#             report_data = {
#                 "total_donations": total_donations,
#                 "pending_donations": pending_donations,
#                 "donations_by_category": donations_by_category_dict
#             }

#             # Optional: Save the report for a specific date
#             report_entry = Reports(
#                 total_donations=total_donations,
#                 pending_donations=pending_donations,
#                 report_date=datetime.now()
#             )
#             db.session.add(report_entry)
#             db.session.commit()

#             return {"message": "Report generated successfully", "data": report_data}, 200

#         except Exception as e:
#             db.session.rollback()
#             return {"message": "Error generating report", "error": str(e)}, 500

#     @jwt_required()
#     def get_user_donations(self, user_id):
#         """
#         Get all donations made by a specific user (donor).
#         """
#         try:
#             # Fetch donations made by the user
#             user_donations = Donations.query.filter_by(user_id=user_id).all()
#             if not user_donations:
#                 return {"message": "No donations found for this user"}, 404

#             return {"message": "User donations retrieved successfully", 
#                     "data": [donation.to_dict() for donation in user_donations]}, 200

#         except Exception as e:
#             return {"message": "Error retrieving user donations", "error": str(e)}, 500
