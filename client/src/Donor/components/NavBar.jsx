import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/donor" className="nav-link">
          Home
        </Link>
        <Link to="/make-donation" className="nav-link">
          Make a Donation
        </Link>{" "}
        {/* Add Make a Donation link */}
        <Link to="/donor-profile" className="nav-link">
        Profile
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
