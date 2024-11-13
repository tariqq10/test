import { Link } from "react-router-dom";
import "./styles/NavBarStyles.css";
import Logo from "./images/Logo2.png";
import SearchBar from "./SearchBar";

const NavBar = ({ isHome, searchOn }) => {
  return (
    <nav className="navbar">
      {/* link to Home */}
      <Link to="/home" className="logo-container">
        <img src={Logo} className="logo" alt="Website Logo" />
      </Link>

      <div className="nav-links">
        {/* Navigation Links */}
        <Link to="/donations" className="nav-link">
          Donations
        </Link>
        <Link to="/categories" className="nav-link">
          Categories
        </Link>
        <Link to="/reports" className="nav-link">
          Reports
        </Link>

        {/* Wishlist Link */}
        <Link to="/wishlist" className="wishlist-link">
          Wishlist
        </Link>

        {/*  render Home button or SearchBar */}
        {isHome ? (
          <Link to="/" className="home-button">
            <i className="fas fa-home"></i> Home
          </Link>
        ) : (
          <SearchBar movies={searchOn} placeholder="Search for a Cause" />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
