import React from 'react';
import AdminNavBar from '../components/AdminNavBar';
import OrganizationList from '../components/OrganizationManagement/OrganizationList';
import { Link } from 'react-router-dom';
import '../styles/dashboard.css'; 

const Organizations = () => {
  return (
    <div className="dashboard-overview">
      <AdminNavBar />
      <div className="dashboard-container">
        <div className="dashboard-main-content">
          <h2>Organization Management</h2>
          <Link to="/admin/organizations/add">
            <button>Add New Organization</button>
          </Link>
          <OrganizationList />
        </div>
      </div>
    </div>
  );
};

export default Organizations;
