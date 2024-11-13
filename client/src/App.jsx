import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './components/HomePage';
import FindDonations from './components/FindDonations';
import AboutUs from './components/AboutUs';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard'; // Import Dashboard component
import './App.css';
import './Admin/styles/dashboard.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <nav>
          <ul>
            <li><Link to="/" aria-label="Home"><i className="fas fa-home"></i> Home</Link></li>
            <li><Link to="/about" aria-label="About Us"><i className="fas fa-info-circle"></i> About Us</Link></li>
            <li><Link to="/register" aria-label="Register"><i className="fas fa-user-plus"></i> Register</Link></li>
            {/* <li><Link to="/login" aria-label="Login"><i className="fas fa-sign-in-alt"></i> Login</Link></li> */}
            <li><Link to="/find-donations" aria-label="Find Donations"><i className="fas fa-search"></i> Find Donations</Link></li>
            <li><Link to="/dashboard" aria-label="Dashboard"><i className="fas fa-tachometer-alt"></i> Dashboard</Link></li> {/* Added Dashboard link */}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/find-donations" element={<FindDonations />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Auth />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} /> {/* Route for Dashboard */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
