from flask_restful import Resource
from models import Donations, db, Reports, Donation_request
from sqlalchemy import func
from flask_jwt_extended import jwt_required
from datetime import datetime

class ReportResource(Resource):

    @jwt_required()
    def get(self):
        """
        Get summarized report including:
        - Total donations
        - Total pending donations
        - Donations by category
        - Remaining donations to meet target for each donation request
        """
        try:
            # Total donations amount
            total_donations = db.session.query(func.sum(Donations.amount)).scalar() or 0.0

            # Total pending donations (those without 'approved' status)
            pending_donations = db.session.query(func.sum(Donations.amount)) \
                .join(Donation_request, Donation_request.request_id == Donations.donation_request_id) \
                .filter(Donation_request.status != 'approved') \
                .scalar() or 0.0

            # Donations by category
            donations_by_category = db.session.query(
                Donations.category_id,
                func.sum(Donations.amount).label("total_amount")
            ).group_by(Donations.category_id).all()

            donations_by_category_dict = [
                {"category_id": category_id, "total_amount": total_amount}
                for category_id, total_amount in donations_by_category
            ]

            # Remaining donations for each donation request
            remaining_donations = db.session.query(
                Donation_request.request_id,
                Donation_request.target_amount,
                func.coalesce(func.sum(Donations.amount), 0).label("donated_amount"),
                (Donation_request.target_amount - func.coalesce(func.sum(Donations.amount), 0)).label("remaining_amount")
            ).outerjoin(Donations, Donations.donation_request_id == Donation_request.request_id) \
             .group_by(Donation_request.request_id) \
             .all()

            remaining_donations_dict = [
                {
                    "request_id": request_id,
                    "target_amount": target_amount,
                    "donated_amount": donated_amount,
                    "remaining_amount": remaining_amount
                }
                for request_id, target_amount, donated_amount, remaining_amount in remaining_donations
            ]

            # Prepare the report data
            report_data = {
                "total_donations": total_donations,
                "pending_donations": pending_donations,
                "donations_by_category": donations_by_category_dict,
                "remaining_donations": remaining_donations_dict
            }

            # Optional: Save the report for a specific date
            report_entry = Reports(
                total_donations=total_donations,
                pending_donations=pending_donations,
                report_date=datetime.now()
            )
            db.session.add(report_entry)
            db.session.commit()

            return {"message": "Report generated successfully", "data": report_data}, 200

        except Exception as e:
            db.session.rollback()
            return {"message": "Error generating report", "error": str(e)}, 500
