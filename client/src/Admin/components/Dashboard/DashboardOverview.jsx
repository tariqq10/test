import React, { useEffect, useState } from 'react';
import StatsCard from './StatsCard';
import CategoryList from './CategoryList';
import Button from '../UI/Button';

const DashboardOverview = () => {
  
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
      <h2>Admin Dashboard</h2>
      <div className="stats-container">
        <StatsCard label="Approved" count={stats.approved} />
        <StatsCard label="Pending" count={stats.pending} />
        <StatsCard label="Denied" count={stats.denied} />
      </div>
      <CategoryList categories={categories} />
      <div className="dashboard-actions">
        <Button label="Manage Categories" onClick={() => console.log('Manage Categories')} />
        <Button label="Requests" onClick={() => console.log('Requests')} />
      </div>
    </div>
  );
};

export default DashboardOverview;
