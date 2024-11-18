import React, { useEffect, useState } from "react";
import "../styles/profile.css"; // Corrected path
import NavBar from "./NavBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchDonations } from "../slices/donationSlice";

const DonorProfile = () => {
  const dispatch = useDispatch()
  const {donationHistory, status, error} = useSelector((state) => state.donations)

  useEffect(() => {
    dispatch(fetchDonations())
  }, [dispatch]);

  if (status === 'loading'){
    return <p>Loading donation history...</p>
  }

  if (status === 'failed'){
    return <p>Error: {error}</p>
  }

  

  return (
    <div className="profile">
      <div>
        <NavBar/>
        <h3>Your Donation History</h3>
        {Array.isArray(donationHistory) ? donationHistory: []
        .length === 0 ? (
          <p>You haven't made any donations yet.</p>
        ):(
          <ul>
            {Array.isArray(donationHistory) && donationHistory.map((donation) => (
              <li key={donation.donation_id}>
                <p>Amount: ${donation.amount}</p>
                <p>Category: {donation.category}</p>
                <p>Date: {new Date(donation.created_at).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        )}
        
      </div>
    </div>
  );
};

export default DonorProfile;


