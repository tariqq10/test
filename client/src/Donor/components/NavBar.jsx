import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./assets/styles/NavBar.css";

const NavBar = () => {
  // Using useLocation to check current route for conditional styling if needed
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link
          to="/home"
          className={`nav-link ${
            location.pathname === "/home" ? "active" : ""
          }`}
        >
          Home
        </Link>
        <Link
          to="/make-donation"
          className={`nav-link ${
            location.pathname === "/make-donation" ? "active" : ""
          }`}
        >
          Make a Donation
        </Link>
        <Link
          to="/donor-profile"
          className={`nav-link ${
            location.pathname === "/donor-profile" ? "active" : ""
          }`}
        >
          Donor Profile
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
