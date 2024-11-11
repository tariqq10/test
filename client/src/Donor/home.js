import React, { useEffect, useState } from "react";
import SearchBar from "./Components/SearchBar";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import "./Components/styles/HomeStyles.css";
import DonationCard from "./Components/DonationCard"; // Assuming you have a DonationCard component

const Home = () => {
  const [donations, setDonations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [userId, setUserId] = useState("");
  const [reportId, setReportId] = useState("");

  useEffect(() => {
    // Fetching donations from the API
    fetch("/api/donations")
      .then((response) => response.json())
      .then((data) => setDonations(data));

    // Fetching categories from the API
    fetch("/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleUserIdChange = (event) => {
    setUserId(event.target.value);
  };

  const handleReportIdChange = (event) => {
    setReportId(event.target.value);
  };

  const handleSubmitDonation = () => {
    const newDonation = {
      user_id: userId,
      amount: parseFloat(amount),
      category_id: selectedCategory,
      report_id: reportId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    // Submit new donation to the API
    fetch("/api/donations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDonation),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update donations state with newly added donation
        setDonations([...donations, data]);
        // Reset form fields
        setAmount("");
        setUserId("");
        setSelectedCategory("");
        setReportId("");
      });
  };

  const renderDonations = () =>
    donations.map((donation) => (
      <DonationCard key={donation.donations_id} donation={donation} />
    ));

  return (
    <div className="container-fluid">
      <div className="HomePage">
        <NavBar isHome={true} />

        <div className="HomeSearch">
          <h2 className="header">Make a Donation</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="userId">User ID:</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={handleUserIdChange}
              required
            />

            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              required
            />

            <label htmlFor="category">Select Category:</label>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name} {/* Assuming category has a name field */}
                </option>
              ))}
            </select>

            <label htmlFor="reportId">Report ID (optional):</label>
            <input
              type="text"
              id="reportId"
              value={reportId}
              onChange={handleReportIdChange}
            />

            <button type="button" onClick={handleSubmitDonation}>
              Submit Donation
            </button>
          </form>
        </div>
      </div>

      {/* Rendering donations */}
      <div className="container-fluid HomeDonations">
        <h2>Recent Donations</h2>
        <div className="container HomeDonationGrid">
          {donations.length > 0 ? (
            renderDonations()
          ) : (
            <p>No donations available.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
