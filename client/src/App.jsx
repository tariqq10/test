import React from 'react';
<<<<<<< HEAD
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
=======
import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import HomePage from './Default/components/HomePage';
import FindDonations from './Default/components/FindDonations';
import AboutUs from './Default/components/AboutUs';
import ManageDonations from './Default/components/ManageDonations'; // Import the new ManageDonations component
import './Admin/styles/dashboard.css';
import Login from './Default/components/Login';
import AdminNavBar from './Admin/components/AdminNavBar';
import Categories from './Admin/pages/Categories';
import DonationRequest from './Admin/pages/DonationRequest';
import DefaultNavbar from './Default/components/DefaultNavbar';
import AdminDashboard from './Admin/pages/AdminDashboard';
import Register from './Default/components/Register';
import Auth from './Donor/components/Auth';
import AuthNGO from './NGO/pages/AuthNGO';
import Home from './NGO/pages/Home';
import NewDonationForm from './NGO/pages/NewDonation';
import DonationHistory from './NGO/pages/DonationHistory';
import Profile from './NGO/pages/Profile';
import Logout from './NGO/pages/Logout';

const App = () => {
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setRole('admin')
    setIsAuthenticated(true)
  }, []);

  const renderNavbar = () => {
    if(isAuthenticated) {
      switch (role) {
        case 'admin':
          return <AdminNavBar />;
        default:
          return <DefaultNavbar />
      }
    }
  }
    const [count, setCount] = useState(0);
  const [donationRequests, setDonationRequests] = useState([]);

  useEffect(() => {
    const fetchedRequests = [
      { id: 1, category: 'Food', description: 'Urgent need for food donations' },
      { id: 2, category: 'Clothing', description: 'Clothing donations for refugees' },
      { id: 3, category: 'Medical', description: 'Medical supplies urgently needed' },
    ];
    setDonationRequests(fetchedRequests);
  }, []);
  
  
  useEffect(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particlesArray = [];
    let animationId;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 10 + 5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
      }

      draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    function init() {
      particlesArray = [];
      for (let i = 0; i < 100; i++) {
        particlesArray.push(new Particle());
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach((particle, i) => {
        particle.update();
        particle.draw();
        if (particle.size <= 0.2) {
          particlesArray.splice(i, 1);
          particlesArray.push(new Particle());
        }
      });
      animationId = requestAnimationFrame(animate);
    }

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <Router>
      <div className="app">
        <canvas id="canvas" />
        {/* <AppRouter/> */}

        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/request" element={<DonationRequest />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/find-donations" element={<FindDonations />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/users/donor" element={<Auth />} />
          <Route path="/users/ngo" element={<AuthNGO/>}/>
          <Route path="/manage-donations" element={<ManageDonations />} />{" "}
          <Route path="/ngo" element={<Home />} />
          <Route path="/new-donation" element={<NewDonationForm />} />
          <Route path="/donation-history" element={<DonationHistory />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/logout" element={<Logout/>} />
          {/* New route */}
>>>>>>> e82d2e8afa71288f53f79a907c1000c553c2c67f
        </Routes>
      </div>
    </Router>
    // </div>
  );

};

export default App;
