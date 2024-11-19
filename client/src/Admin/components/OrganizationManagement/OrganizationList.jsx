import React, { useState, useEffect } from 'react';
import AdminNavBar from '../AdminNavBar'; 
import OrganizationItem from './OrganizationItem';
import axios from 'axios';
import '../../styles/dashboard.css'; 

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);

  const fetchOrganizations = async () => {
    const token = localStorage.getItem('access_token'); 
    try {
      const response = await axios.get('http://127.0.0.1:5000/organizations', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  };

  const deleteOrganization = async (id) => {
    console.log('Deleting organization with ID:', id);  // Log the ID to check its value
    const token = localStorage.getItem('access_token'); 
    try {
      await axios.delete(`http://127.0.0.1:5000/organizations/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Organization deleted successfully.');
      fetchOrganizations();
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };
  

  const updateOrganization = async (id, updatedData) => {
    const token = localStorage.getItem('access_token'); 
    try {
      await axios.patch(`http://127.0.0.1:5000/organizations/${id}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Organization updated successfully.');
      fetchOrganizations();
    } catch (error) {
      console.error('Error updating organization:', error);
    }
  };

  useEffect(() => {
    fetchOrganizations();
  }, []);

  return (
    <div className="dashboard-container">
      <AdminNavBar />
      <div className="dashboard-main-content">
        <h2 className="org-Label">All Organizations</h2>
        {organizations.map((organization) => (
          <OrganizationItem 
            key={organization.id} 
            organization={organization}
            deleteOrganization={deleteOrganization}
            updateOrganization={updateOrganization}
          />
        ))}
      </div>
    </div>
  );
};

export default OrganizationList;
