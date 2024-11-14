import React from "react";
import { Link } from "react-router-dom";
import "./assets/styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/home" className="nav-link">
          Home
        </Link>
        <Link to="/make-donation" className="nav-link">
          Make a Donation
        </Link>{" "}
        {/* Add Make a Donation link */}
        <Link to="/donor-profile" className="nav-link">
          Donor Profile
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
