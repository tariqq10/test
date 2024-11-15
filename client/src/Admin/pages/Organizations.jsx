// src/Admin/pages/Organizations.jsx
import React from 'react';
import OrganizationList from '../components/OrganizationManagement/OrganizationList';
import { Link } from 'react-router-dom';

const Organizations = () => {
  return (
    <div>
      <h2>Organization Management</h2>
      <Link to="/admin/organizations/add">
        <button>Add New Organization</button>
      </Link>
      <OrganizationList />
    </div>
  );
};

export default Organizations;
