import { useState } from "react";
import Navbar from "../components/Navbar";

const NewDonationForm = () => {
  // State to track form inputs
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [orgName, setOrgName] = useState("");
  const [orgEmail, setOrgEmail] = useState("");
  const [orgAddress, setOrgAddress] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);
  const handleOrgNameChange = (e) => setOrgName(e.target.value);
  const handleOrgEmailChange = (e) => setOrgEmail(e.target.value);
  const handleOrgAddressChange = (e) => setOrgAddress(e.target.value);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (you can extend this as needed)
    if (!category || !description || !amount || !date || !orgName || !orgEmail || !orgAddress) {
      alert("Please fill out all fields");
      return;
    }

    // Here we would typically send the form data to an API or store it
    console.log({
      category,
      description,
      amount,
      date,
      orgName,
      orgEmail,
      orgAddress,
    });

    // Set submission success message
    setIsSubmitted(true);

    // Reset form (optional)
    setCategory("");
    setDescription("");
    setAmount("");
    setDate("");
    setOrgName("");
    setOrgEmail("");
    setOrgAddress("");
  };

  return (
    <div style={styles.pageContainer}>
      <div style={styles.header}>
        <h2>Donation Appeal Form</h2>
      </div>
      <div style={styles.formContainer}>
        {isSubmitted && <p style={styles.successMessage}>Your donation has been submitted!</p>}
        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Donation Category */}
          <div style={styles.formGroup}>
            <label htmlFor="category" style={styles.label}>Donation Category:</label>
            <select
              id="category"
              value={category}
              onChange={handleCategoryChange}
              required
              style={styles.input}
            >
              <option value="">Select category</option>
              <option value="Food">Food</option>
              <option value="Clothing">Clothing</option>
              <option value="Medical">Medical</option>
              <option value="Education">Education</option>
            </select>
          </div>

          {/* Description */}
          <div style={styles.formGroup}>
            <label htmlFor="description" style={styles.label}>Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              required
              placeholder="Enter a brief description of your donation"
              style={styles.textarea}
            ></textarea>
          </div>

          {/* Amount */}
          <div style={styles.formGroup}>
            <label htmlFor="amount" style={styles.label}>Amount:</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              required
              placeholder="Amount of donation"
              style={styles.input}
            />
          </div>

          {/* Donation Date */}
          <div style={styles.formGroup}>
            <label htmlFor="date" style={styles.label}>Donation Date:</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={handleDateChange}
              required
              style={styles.input}
            />
          </div>

          {/* Organization Name */}
          <div style={styles.formGroup}>
            <label htmlFor="orgName" style={styles.label}>Organization Name:</label>
            <input
              type="text"
              id="orgName"
              value={orgName}
              onChange={handleOrgNameChange}
              required
              placeholder="Enter organization name"
              style={styles.input}
            />
          </div>

          {/* Organization Email */}
          <div style={styles.formGroup}>
            <label htmlFor="orgEmail" style={styles.label}>Organization Email:</label>
            <input
              type="email"
              id="orgEmail"
              value={orgEmail}
              onChange={handleOrgEmailChange}
              required
              placeholder="Enter organization email"
              style={styles.input}
            />
          </div>

          {/* Organization Address */}
          <div style={styles.formGroup}>
            <label htmlFor="orgAddress" style={styles.label}>Organization Address:</label>
            <textarea
              id="orgAddress"
              value={orgAddress}
              onChange={handleOrgAddressChange}
              required
              placeholder="Enter organization address"
              style={styles.textarea}
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.submitButton}>Submit Donation</button>
        </form>
      </div>
    </div>
  );
};

// Inline styles object
const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f4f4f9", // Light background color
    padding: "20px",
    minHeight: "100vh", // Ensure the container fills the viewport height without overflow
    boxSizing: "border-box", // Include padding and borders in element's total width/height
  },
  header: {
    width: "100%",
    padding: "1rem 0",
    textAlign: "center", // Center the header text
    color: "white",
    fontSize: "1.4rem", // Reduced the font size
    fontWeight: "bold",
    background: "linear-gradient(to right, #6a1b9a, #9c27b0)", // Purple gradient background for the header
    borderBottom: "2px solid #ddd",
    marginBottom: "20px",
  },
  formContainer: {
    width: "100%", // Full width
    maxWidth: "400px", // Reduce maximum width to ensure responsiveness
    backgroundColor: "#fff", // White background for the form
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
  },
  successMessage: {
    color: "#28a745",
    textAlign: "center",
    marginBottom: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1.5rem",
  },
  label: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#000", // Black text for the form
    marginBottom: "0.5rem",
  },
  input: {
    width: "100%", // Make input fields fill the container width
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
  },
  textarea: {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1rem",
    resize: "vertical",
    minHeight: "100px",
  },
  submitButton: {
    background: "linear-gradient(to right, #6a1b9a, #9c27b0)", // Purple gradient background for the submit button
    color: "white",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
    marginTop: "1.5rem",
  },
};

export default NewDonationForm;
