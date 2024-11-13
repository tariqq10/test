import { useState } from "react";
import Navbar from "../components/Navbar";

const NewDonationForm = () => {
  // State to track form inputs
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleDescriptionChange = (e) => setDescription(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);
  const handleDateChange = (e) => setDate(e.target.value);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation (you can extend this as needed)
    if (!category || !description || !amount || !date) {
      alert("Please fill out all fields");
      return;
    }

    // Here we would typically send the form data to an API or store it
    console.log({
      category,
      description,
      amount,
      date,
    });

    // Set submission success message
    setIsSubmitted(true);

    // Reset form (optional)
    setCategory("");
    setDescription("");
    setAmount("");
    setDate("");
  };

  return (
    <div style={styles.formContainer}>
      <Navbar/>
      <h2>New Donation</h2>
      {isSubmitted && <p style={styles.successMessage}>Your donation has been submitted!</p>}
      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="category" style={styles.label}>Donation Category</label>
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

        <div style={styles.formGroup}>
          <label htmlFor="description" style={styles.label}>Description</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
            placeholder="Enter a brief description of your donation"
            style={styles.textarea}
          ></textarea>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="amount" style={styles.label}>Amount</label>
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

        <div style={styles.formGroup}>
          <label htmlFor="date" style={styles.label}>Donation Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            required
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.submitButton}>Submit Donation</button>
      </form>
    </div>
  );
};

// Inline styles object
const styles = {
  formContainer: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "2rem",
    backgroundColor: "#f4f4f9",
    borderRadius: "8px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  successMessage: {
    color: "#28a745",
    textAlign: "center",
    marginBottom: "1rem",
  },
  formGroup: {
    marginBottom: "1rem",
  },
  label: {
    fontSize: "1.1rem",
    fontWeight: "bold",
    color: "#555",
  },
  input: {
    width: "100%",
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
    backgroundColor: "#4caf50",
    color: "white",
    padding: "0.75rem 1.5rem",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.2rem",
  },
};

export default NewDonationForm;