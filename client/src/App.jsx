import React from 'react';
import './Admin/styles/dashboard.css';

import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AdminDashboard from './Admin/pages/AdminDashboard'; // Corrected to include the `Admin` folder


const App = () => (
  <Router>
    <Routes>
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/" element={<Navigate to="/admin" replace />} />
    </Routes>
  </Router>
);

export default App;



