import React from "react";

const DonationHistory = ({ history }) => {
  return (
    <div className="donation-history">
      <h2>Your Donation History</h2>
      {history.map((entry, index) => (
        <div key={index} className="history-entry">
          <p>
            Donation to NGO: {entry.ngoName} - Amount: ${entry.amount} - Date:{" "}
            {entry.date}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DonationHistory;
