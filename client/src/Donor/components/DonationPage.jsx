import React, { useState } from "react";
import "../styles/DonationPage.css"; // Optional: Custom styles for the donation page
import NavBar from "./NavBar";

const DonationPage = () => {
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleDonationSubmit = async () => {
    const newDonation = {
      user_id: userId,
      amount: parseFloat(amount),
      category_id: selectedCategory,
      created_at: new Date().toISOString(),
    };

    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDonation),
      });
      const data = await response.json();
      // Handle the response, for example, show success message, reset form, etc.
    } catch (error) {
      console.error("Error submitting donation", error);
    }
  };

  return (
    <div className="donation-page">
      <NavBar/>
      <h2>Make a Donation</h2>
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {/* Optionally, you can populate categories from an API */}
        <option value="1">Category 1</option>
        <option value="2">Category 2</option>
      </select>
      <button onClick={handleDonationSubmit}>Submit Donation</button>
    </div>
  );
};

export default DonationPage;
