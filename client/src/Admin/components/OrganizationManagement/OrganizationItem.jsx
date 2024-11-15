// src/Admin/components/OrganizationManagement/OrganizationItem.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const OrganizationItem = ({ organization }) => {
  return (
    <div className="organization-item">
      <h3>{organization.name}</h3>
      <p>{organization.contactInfo}</p>
      <p>{organization.address}</p>
      <Link to={`/admin/organizations/${organization.id}`}>View Details</Link>
    </div>
  );
};

export default OrganizationItem;
