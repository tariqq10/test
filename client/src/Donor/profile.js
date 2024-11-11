import React, { useEffect, useState } from "react";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import DonationCard from "./Components/DonationCard";
import "./Components/styles/ProfileStyles.css";

const Profile = () => {
  const [donorInfo, setDonorInfo] = useState({});
  const [donationHistory, setDonationHistory] = useState([]);
  const donorId = 1;

  useEffect(() => {
    // Fetch donor information
    fetch(`/api/donors/${donorId}`)
      .then((response) => response.json())
      .then((data) => setDonorInfo(data));

    // Fetch donation history
    fetch(`/api/donations?user_id=${donorId}`)
      .then((response) => response.json())
      .then((data) => setDonationHistory(data));
  }, [donorId]);

  const renderDonationHistory = () =>
    donationHistory.map((donation) => (
      <DonationCard key={donation.donations_id} donation={donation} />
    ));

  return (
    <div className="profile-container">
      <NavBar isHome={false} />
      <div className="profile-content">
        <h2>Donor Profile</h2>
        <div className="donor-info">
          <h3>Personal Information</h3>
          <p>
            <strong>Name:</strong> {donorInfo.name}
          </p>
          <p>
            <strong>Email:</strong> {donorInfo.email}
          </p>
          <p>
            <strong>User ID:</strong> {donorInfo.user_id}
          </p>
        </div>

        <div className="donation-history">
          <h3>Donation History</h3>
          {donationHistory.length > 0 ? (
            renderDonationHistory()
          ) : (
            <p>No donation history available.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;
