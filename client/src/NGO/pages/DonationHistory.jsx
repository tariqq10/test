import React from "react";
import Navbar from "../components/Navbar";

const DonationHistory = () => {
  return (
    <div>
      <div>
        <Navbar/>
        <h2>Donation History</h2>
        <p>Here are the donation records.</p>
        <table border="1" cellPadding="10" cellSpacing="0">
          <thead>
            <tr>
              <th>Donation ID</th>
              <th>Donor Name</th>
              <th>Amount Donated</th>
              <th>Currency</th>
              <th>Date</th>
              <th>Payment Method</th>
              <th>Campaign Name</th>
              <th>Donation Type</th>
              <th>Tax Receipt Sent</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>001</td>
              <td>John Doe</td>
              <td>$100</td>
              <td>USD</td>
              <td>2024-11-01</td>
              <td>Credit Card</td>
              <td>Education Initiative</td>
              <td>One-time</td>
              <td>Yes</td>
              <td>Keep it up!</td>
            </tr>

            <tr>
              <td>002</td>
              <td>Jane Smith</td>
              <td>$50</td>
              <td>USD</td>
              <td>2024-11-02</td>
              <td>PayPal</td>
              <td>Healthcare Fund</td>
              <td>Monthly</td>
              <td>No</td>
              <td></td>
            </tr>

            <tr>
              <td>003</td>
              <td>ABC Corp.</td>
              <td>$500</td>
              <td>USD</td>
              <td>2024-11-03</td>
              <td>Bank Transfer</td>
              <td>Disaster Relief Fund</td>
              <td>One-time</td>
              <td>Yes</td>
              <td></td>
            </tr>

            <tr>
              <td>004</td>
              <td>Anonymous</td>
              <td>$20</td>
              <td>USD</td>
              <td>2024-11-04</td>
              <td>Cheque</td>
              <td>General Fund</td>
              <td>One-time</td>
              <td>Yes</td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DonationHistory;