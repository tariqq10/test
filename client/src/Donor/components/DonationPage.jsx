import React, { useState } from "react";
import "../styles/DonationPage.css"; // Optional: Custom styles for the donation page
import NavBar from "./NavBar";
import { postDonation } from "../slices/charity";
import { useDispatch } from "react-redux";
import {setDonations} from "../slices/donationSlice"

const DonationPage = () => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!amount || amount <= 0){
      setError('Please enter a valid donation amount.')
      return;
    }

    try {
      const donationData = {
        amount: parseFloat(amount),
        donation_request_id: donationRequest.donation_request_id,
      }
      const response = await postDonation(donationData);
      setAmount("")
      setError("")
      alert("Donation Seccessful!")
      dispatch(setDonations(response.data.donations))
    } catch (error) {
      setError("Failed to make donation, Please try again")
    }
  }
    
  return (
    <div className="donation-page">
      <NavBar/>
      <h2>Make a Donation</h2>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
     
      <button type="submit" >Donate</button>
    </div>
  );
};

export default DonationPage;
