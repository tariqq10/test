// src/Admin/components/OrganizationManagement/OrganizationList.jsx
import React, { useState, useEffect } from 'react';
import OrganizationDetails from './OrganizationDetails';
import OrganizationForm from './OrganizationForm';  // Make sure this is correctly imported
import OrganizationItem from './OrganizationItem';
import axios from 'axios';
// src/Admin/components/OrganizationManagement/OrganizationList.jsx
const OrganizationList = () => {
    const [organizations, setOrganizations] = useState([]);
  
    const fetchOrganizations = async () => {
      try {
        const response = await axios.get('/api/organizations');
        setOrganizations(response.data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };
  
    useEffect(() => {
      fetchOrganizations();
    }, []);
  
    return (
      <div>
        <h2>Organizations</h2>
        <OrganizationForm refreshOrganizations={fetchOrganizations} />
        {organizations.length > 0 ? (
          organizations.map((org) => (
            <OrganizationItem key={org.id} organization={org} />
          ))
        ) : (
          <p>No organizations available</p>
        )}
      </div>
    );
  };
  
export default OrganizationList;
