import React from "react";
import "./styles/DonationCardStyles.css";

const DonationCard = ({ donation }) => {
  const { amount, user_id, category_id, created_at, updated_at } = donation;

  return (
    <div className="donation-card">
      <h3 className="donation-amount">${amount.toFixed(2)}</h3>
      <p className="donation-user">Donor ID: {user_id}</p>
      <p className="donation-category">Category ID: {category_id}</p>
      <p className="donation-date">
        Donated On: {new Date(created_at).toLocaleDateString()}
      </p>
      <p className="donation-updated">
        Last Updated: {new Date(updated_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default DonationCard;
