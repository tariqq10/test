import React from 'react';
import Navbar from '../components/Navbar';

const Profile = () => {
  return (
    <div className="profile-container">
      <div>
        <Navbar/>
        <h2>User Profile</h2>

        {/* Profile Summary Section */}
        <div className="profile-summary">
          <h3>Personal Information</h3>
          <p>
            <strong>Name:</strong> John Doe
          </p>
          <p>
            <strong>Email:</strong> johndoe@example.com
          </p>
          <p>
            <strong>Phone:</strong> +1 234 567 890
          </p>
          <p>
            <strong>Member Since:</strong> January 2023
          </p>
          <p>
            <strong>Status:</strong> Active
          </p>
        </div>

        {/* Donation History Section */}
        <div className="donation-history">
          <h3>Donation History</h3>
          <table
            border="1"
            cellpadding="10"
            cellspacing="0"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                <th>Donation ID</th>
                <th>Amount</th>
                <th>Campaign</th>
                <th>Date</th>
                <th>Payment Method</th>
                <th>Tax Receipt Sent</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>$100</td>
                <td>Education Initiative</td>
                <td>2024-11-01</td>
                <td>Credit Card</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td>002</td>
                <td>$50</td>
                <td>Healthcare Fund</td>
                <td>2024-11-02</td>
                <td>PayPal</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="account-settings">
        <h3>Account Settings</h3>
        <form action="/update-profile" method="POST">
          <label htmlFor="new-email">New Email Address:</label>
          <br />
          <input
            type="email"
            id="new-email"
            name="new-email"
            defaultValue="johndoe@example.com"
          />
          <br />
          <br />

          <label htmlFor="new-phone">New Phone Number:</label>
          <br />
          <input
            type="tel"
            id="new-phone"
            name="new-phone"
            defaultValue="+1 234 567 890"
          />
          <br />
          <br />

          <label htmlFor="new-password">New Password:</label>
          <br />
          <input
            type="password"
            id="new-password"
            name="new-password"
            placeholder="Enter new password"
          />
          <br />
          <br />

          <button type="submit">Save Changes</button>
        </form>
      </div>

      <div className="donation-preferences">
        <h3>Donation Preferences</h3>
        <p>
          Would you like to receive updates on upcoming campaigns?{" "}
          <strong>Yes</strong>
        </p>
        <p>
          Preferred donation method: <strong>Credit Card</strong>
        </p>
      </div>
    </div>
  );
};

export default Profile;