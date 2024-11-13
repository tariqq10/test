
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


import Navbar from './components/Navbar'; 
import Home from './pages/Home';
import NewDonation from './pages/NewDonation';
import DonationHistory from './pages/DonationHistory';
import Profile from './pages/Profile';
import Logout from './pages/Logout';

function App() {
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

  return (
    <Router>
      <div className="App">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main style={{ padding: "20px" }}>
          <Routes>
            {/* Define Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/new-donation" element={<NewDonation />} />
            <Route path="/donation-history" element={<DonationHistory />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
