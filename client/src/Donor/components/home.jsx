import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import NgoCard from "./NgoCard"; // Assuming NgoCard is already styled
import "../styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import donationSlice, { fetchApprovedDonations } from "../slices/donationSlice";

const DonorHome = () => {
  const dispatch = useDispatch();
  const {approvedDonations, status, error} = useSelector((state) => state.donations);
  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      dispatch(fetchApprovedDonations(token))
    }
  }, [dispatch, token]);

  if (status === 'loading'){
    return <div>Loading...</div>
  }

  if (status === 'failed'){
    return <div>Error: {error}</div>
  }

  return (
    <div className="home">
      <NavBar isHome={true} />

      <div className="ngo-cards">
        <h2>Approved donation requests</h2>
        {approvedDonations.length > 0 ? (
          <div>
            {approvedDonations.map((donation) => (
              <div key={donation.request_id}>
                <h3>{donation.title}</h3>
                <p>{donation.description}</p>
                <p><strong>Category:</strong>{donation.category}</p>
              </div>
        ))}
        </div>
  ) : (
    <p>No approved donations found</p>
  )}
  </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DonorHome;
