import React, { useState, useEffect } from 'react';
import AdminNavBar from '../AdminNavBar'; 
import OrganizationForm from './OrganizationForm';
import OrganizationItem from './OrganizationItem';
import axios from 'axios';
import '../../styles/dashboard.css'; 

const OrganizationList = () => {
  const [organizations, setOrganizations] = useState([]);
  const [authToken, setAuthToken] = useState(localStorage.getItem('access_token')); 

  
  const getAuthToken = () => {
    return localStorage.getItem('access_token');
  };

  // Fetch Organizations
  const fetchOrganizations = async () => {
    const token = getAuthToken(); 
    try {
      const response = await axios.get('http://127.0.0.1:5000/organizations', {
        headers: {
          Authorization: `Bearer ${token}`, 
        }
      });
      setOrganizations(response.data);
    } catch (error) {
      console.error('Error fetching organizations:', error);
      if (error.response && error.response.status === 401) {
        
        console.log('Session expired. Please log in again.');
      }
    }
  };

  // Delete Organization
  const deleteOrganization = async (organizationId) => {
    const token = getAuthToken(); 
    try {
      await axios.delete(`http://127.0.0.1:5000/organizations/${organizationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setOrganizations(organizations.filter(org => org.id !== organizationId)); 
    } catch (error) {
      console.error('Error deleting organization:', error);
    }
  };

  // Update Organization (PATCH)
  const updateOrganization = async (organizationId, updatedData) => {
    const token = getAuthToken(); 
    try {
      await axios.patch(`http://127.0.0.1:5000/organizations/${organizationId}`, updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      fetchOrganizations(); // Refresh the list after updating
    } catch (error) {
      console.error('Error updating organization:', error);
    }
  };

  // Create Organization (POST)
  const createOrganization = async (newOrgData) => {
    const token = getAuthToken(); 
    try {
      await axios.post('http://127.0.0.1:5000/organizations', newOrgData, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      fetchOrganizations(); 
    } catch (error) {
      console.error('Error creating organization:', error);
    }
  };

  
  useEffect(() => {
    if (authToken) {
      fetchOrganizations();
    } else {
      console.log("No access token found.");
    }
  }, [authToken]);

  return (
    <div className="dashboard-overview">
      <AdminNavBar />
      <div className="dashboard-container">
        <div className="dashboard-main-content">
          <h2>Organizations</h2>
          <OrganizationForm createOrganization={createOrganization} />
          {organizations.length > 0 ? (
            organizations.map((org) => (
              <OrganizationItem
                key={org.id}
                organization={org}
                deleteOrganization={deleteOrganization} 
                updateOrganization={updateOrganization} 
              />
            ))
          ) : (
            <p>No organizations available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizationList;
