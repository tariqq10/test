import React, { useState } from "react";

const Profile = () => {
  // State for account settings form (e.g., to handle new email, phone, and password)
  const [newEmail, setNewEmail] = useState("johndoe@example.com");
  const [newPhone, setNewPhone] = useState("+1 234 567 890");
  const [newPassword, setNewPassword] = useState("");

  // Handle input changes
  const handleEmailChange = (e) => setNewEmail(e.target.value);
  const handlePhoneChange = (e) => setNewPhone(e.target.value);
  const handlePasswordChange = (e) => setNewPassword(e.target.value);

  // Form submission handler for account settings
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend for updating the user profile
    console.log("Updated Profile:", { newEmail, newPhone, newPassword });
    alert("Profile updated!");
  };

  return (
    <div style={styles.profileContainer}>
      <h2>User Profile</h2>

      {/* Profile Summary Section */}
      <div style={styles.profileSummary}>
        <h3>Personal Information</h3>
        <p><strong>Name:</strong> John Doe</p>
        <p><strong>Email:</strong> johndoe@example.com</p>
        <p><strong>Phone:</strong> +1 234 567 890</p>
        <p><strong>Member Since:</strong> January 2023</p>
        <p><strong>Status:</strong> Active</p>
      </div>

      {/* Donation History Section */}
      <div style={styles.donationHistory}>
        <h3>Donation History</h3>
        <table style={styles.table}>
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

      {/* Account Settings Section */}
      <div style={styles.accountSettings}>
        <h3>Account Settings</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-email">New Email Address:</label><br />
          <input
            type="email"
            id="new-email"
            name="new-email"
            value={newEmail}
            onChange={handleEmailChange}
            style={styles.input}
          /><br /><br />

          <label htmlFor="new-phone">New Phone Number:</label><br />
          <input
            type="tel"
            id="new-phone"
            name="new-phone"
            value={newPhone}
            onChange={handlePhoneChange}
            style={styles.input}
          /><br /><br />

          <label htmlFor="new-password">New Password:</label><br />
          <input
            type="password"
            id="new-password"
            name="new-password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={handlePasswordChange}
            style={styles.input}
          /><br /><br />

          <button type="submit" style={styles.submitButton}>Save Changes</button>
        </form>
      </div>

      {/* Donation Preferences Section */}
      <div style={styles.donationPreferences}>
        <h3>Donation Preferences</h3>
        <p>Would you like to receive updates on upcoming campaigns? <strong>Yes</strong></p>
        <p>Preferred donation method: <strong>Credit Card</strong></p>
      </div>
    </div>
  );
};

const styles = {
  profileContainer: {
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "0 auto",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
  },
  profileSummary: {
    marginBottom: "30px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  donationHistory: {
    marginBottom: "30px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  accountSettings: {
    marginBottom: "30px",
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  donationPreferences: {
    padding: "10px",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  input: {
    width: "100%",
    padding: "8px",
    margin: "5px 0 15px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  submitButton: {
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Profile;
