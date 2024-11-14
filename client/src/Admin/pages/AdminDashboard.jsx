import React from 'react';
import '../styles/dashboard.css';
import '../styles/sidebar.css';
import { useEffect, useState } from 'react';
import StatsCard from '../components/Dashboard/StatsCard';
import Button from '../components/UI/Button';
import AdminNavBar from '../components/AdminNavBar';
import Sidebar from '../components/Sidebar'; 

const AdminDashboard = () => {
  
  const [stats, setStats] = useState({
    approved: 0,
    pending: 0,
    denied: 0,
  });

  
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    
    const fetchStats = async () => {
      try {
        
        const response = await fetch('/api/stats'); 
        const data = await response.json();
        setStats({
          approved: data.approved,
          pending: data.pending,
          denied: data.denied,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    
    const fetchCategories = async () => {
      try {
      
        const response = await fetch('/api/categories'); 
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchStats();
    fetchCategories();
  }, []);

  
  return (
    <div className="dashboard-overview">
      <AdminNavBar />
      <div className="dashboard-container">
        <Sidebar /> 
        <div className="dashboard-main-content">
          <h2>Admin Dashboard</h2>
          <div className="stats-container">
            <StatsCard label="Approved" count={stats.approved} />
            <StatsCard label="Pending" count={stats.pending} />
            <StatsCard label="Denied" count={stats.denied} />
          </div>

          <div className="dashboard-actions">
            <Button
              label="Manage Requests"
              onClick={() => console.log("Manage Categories")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
