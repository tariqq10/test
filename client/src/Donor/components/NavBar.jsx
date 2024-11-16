import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";
import Logout from "./logout";

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="nav-links">
        <ul>
          <li><Link to="/donor" className="nav-link">
            Home
          </Link>
          </li>
          <li>
          <Link>Donation request</Link>
          </li>
          <li>
          <Link to="/make-donation" className="nav-link">
            Make a Donation
          </Link>{" "}</li>
          {/* Add Make a Donation link */}
          <li>
          <Link to="/donor-profile" className="nav-link">
            Profile
          </Link>
          </li>
          <li><Logout/></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
