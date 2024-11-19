import React from "react"

const Home = () => {
  // Define the styles for the container and elements
  const containerStyle = {
    backgroundColor: "#f8f8f8", // Light background for the page
    fontFamily: "Arial, sans-serif", // Font family
    height: "100vh", // Full viewport height
    display: "flex", // Use flexbox layout
    flexDirection: "column", // Stack content vertically
    justifyContent: "flex-start", // Align content to the top
    width: "100%", // Match the full width of the page, remove centering for a natural layout
    maxWidth: "900px", // Prevent the container from becoming too wide
    margin: "0 auto", // Center the container horizontally (if needed)
    padding: "20px", // Add padding to the container to give some space from edges
  };

  const buttonStyle = {
    border: "1px solid transparent",
    padding: "10px 15px",
    borderRadius: "5px",
    fontSize: "16px",
    margin: "10px 0", // Adjust margin for vertical spacing
    cursor: "pointer",
    width: "80%", // Make buttons stretch to 80% of container width
    maxWidth: "300px", // Prevent buttons from becoming too wide
  };

  // Style for each button
  const pendingStyle = { 
    ...buttonStyle, 
    backgroundColor: "transparent", // Invisible background
    border: "1px solid black", // Black border
    color: "black", // Black font
  };

  const approvedStyle = { 
    ...buttonStyle, 
    backgroundColor: "transparent", // Invisible background
    border: "1px solid lightgreen", // Light green border
    color: "lightgreen", // Light green font
  };

  const rejectedStyle = { 
    ...buttonStyle, 
    backgroundColor: "transparent", // Invisible background
    border: "1px solid red", // Red border
    color: "red", // Red font
  };

  const createRequestStyle = { 
    ...buttonStyle, 
    background: "linear-gradient(to right, purple, indigo)", // Gradient purple background
    color: "white", // White font
    marginTop: "20px", // Add top margin to push it down a bit
  };

  const headerStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#fff",
    background: "linear-gradient(to right, purple, indigo)", // Gradient background for header
    padding: "8px 20px",
    borderRadius: "5px",
    marginBottom: "20px",
    width: "100%", // Ensure header takes up full width of the container
  };

  return (
    <div style={containerStyle}>
      {/* Main content */}
      <h2 style={headerStyle}>My Requests</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
        <button style={pendingStyle}>Pending Request</button>
        <button style={approvedStyle}>Approved Request</button>
        <button style={rejectedStyle}>Rejected Request</button>
      </div>
      {/* Create Request Donation button */}
      <button style={createRequestStyle}>Create Request Donation</button>
    </div>
  );
};

export default Home;
