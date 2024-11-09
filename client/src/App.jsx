import React from 'react';
import './Admin/styles/dashboard.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminDashboard from './Admin/pages/AdminDashboard'; // Corrected to include the `Admin` folder
import Categories from './Admin/pages/Categories';
import DonationRequest from './Admin/pages/DonationRequest';
import AdminNavBar from './Admin/components/AdminNavBar';


const App = () => (
  <>
    <Router>
      <AdminNavBar />

      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/requests" element={<DonationRequest />} />
        {/* <Route path="/" element={<Navigate to="/admin" replace />} /> */}
      </Routes>
    </Router>
  </>
);

export default App;



