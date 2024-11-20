import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import "../styles/home.css";
import { useDispatch, useSelector } from "react-redux";
import donationSlice, { fetchApprovedDonations } from "../slices/donationSlice";
import DonationPage from "./DonationPage";

const Requests= () => {
  const dispatch = useDispatch();
  const {approvedDonations, status, error} = useSelector((state) => state.donations);
  const [selectedDonation, setSelectedDonation] = useState(null)


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

  const handleClick = (donationRequest) => {
    setSelectedDonation(donationRequest)
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
                <button onClick={() => handleClick(donation)}>Donate</button>
              </div>
        ))}
        </div>
  ) : (
    <p>No approved donations found</p>
  )}
  </div>

      {/* Footer */}
      <Footer />
      {selectedDonation && (
        <DonationPage
        donationRequest = {selectedDonation}
        onClose={() => setSelectedDonation(null)}
        />
      )}
    </div>
  );
};

export default Requests;
