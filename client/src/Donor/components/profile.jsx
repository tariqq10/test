import React, { useEffect, useState } from "react";
import "../styles/profile.css"; // Corrected path
import NavBar from "./NavBar";

const DonorProfile = () => {
  const [donor, setDonor] = useState({});
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchDonorData = async () => {
      try {
        const response = await fetch("/api/donor-profile");
        const data = await response.json();
        setDonor(data);
        setName(data.name);
        setEmail(data.email);

        const donationsResponse = await fetch(
          `/api/donations?user_id=${data.user_id}`
        );
        const donationsData = await donationsResponse.json();
        setDonations(donationsData);
      } catch (error) {
        console.error("Error fetching donor data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonorData();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    const updatedDonor = { name, email };

    try {
      const response = await fetch("/api/donor-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDonor),
      });
      if (response.ok) {
        setDonor({ ...donor, ...updatedDonor });
        alert("Profile updated successfully");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="profile">
      <div>
        <NavBar/>
        <h2>Donor Profile</h2>
        <form onSubmit={handleProfileUpdate}>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Update Profile</button>
        </form>

        <h3>Your Donations</h3>
        <ul>
          {donations.map((donation) => (
            <li key={donation.donations_id}>
              ${donation.amount} donated on{" "}
              {new Date(donation.created_at).toLocaleDateString()}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DonorProfile;
// // from flask_restful import Resource
// // from flask_jwt_extended import jwt_required, get_jwt_identity
// // from models import Users, Donations
// // from flask import jsonify

// // class DonorProfileResource(Resource):
// //     @jwt_required()  # Ensure the user is logged in
// //     def get(self):
// //         # Get the logged-in user's ID from JWT token
// //         current_user_id = get_jwt_identity()

// //         # Fetch the user's details from the Users table
// //         user = Users.query.get(current_user_id)
// //         if user is None:
// //             return {'message': 'User not found'}, 404

// //         # Fetch the donor's donation history
// //         donation_history = Donations.query.filter_by(user_id=current_user_id).all()

// //         # Return the user's profile data and donation history
// //         profile_data = {
// //             'name': user.name,
// //             'email': user.email,
// //             'phone': user.phone,
// //             'address': user.address,  # Add any other fields you want to display
// //             'donation_history': [donation.to_dict() for donation in donation_history]  # Assuming to_dict() method in Donations model
// //         }

// //         return jsonify(profile_data)


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const DonorProfile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Get JWT token from localStorage
//   const jwtToken = localStorage.getItem('jwtToken');

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/profile', {
//           headers: {
//             Authorization: `Bearer ${jwtToken}`,
//           },
//         });

//         // Set profile data to state
//         setProfileData(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch profile data');
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, [jwtToken]);

//   const handleLogout = () => {
//     // Clear JWT token from localStorage and redirect to login page
//     localStorage.removeItem('jwtToken');
//     navigate('/login');
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="profile-container">
//       <h2>Donor Profile</h2>
      
//       {/* Display Profile Information */}
//       <div className="profile-details">
//         <p><strong>Name:</strong> {profileData.name}</p>
//         <p><strong>Email:</strong> {profileData.email}</p>
//         <p><strong>Phone:</strong> {profileData.phone}</p>
//         <p><strong>Address:</strong> {profileData.address}</p>
//       </div>

//       {/* Display Donation History */}
//       <h3>Donation History</h3>
//       <ul>
//         {profileData.donation_history.length > 0 ? (
//           profileData.donation_history.map((donation) => (
//             <li key={donation.donation_id}>
//               <strong>Amount:</strong> ${donation.amount}
//               <br />
//               <strong>Category:</strong> {donation.category}
//               <br />
//               <strong>Reason:</strong> {donation.reason}
//               <br />
//               <strong>Date:</strong> {new Date(donation.date).toLocaleDateString()}
//             </li>
//           ))
//         ) : (
//           <p>No donations made yet.</p>
//         )}
//       </ul>

//       {/* Logout Button */}
//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// };

// export default DonorProfile;

