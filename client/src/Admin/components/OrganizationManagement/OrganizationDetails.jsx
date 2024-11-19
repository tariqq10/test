import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminNavBar from '../AdminNavBar'; 
import OrganizationForm from './OrganizationForm';
import '../../styles/dashboard.css'; 

const OrganizationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [organization, setOrganization] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      const token = localStorage.getItem('accessToken'); 
      if (!token) {
        setError('No access token found. Please log in again.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:5000/organizations/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setOrganization(response.data);
      } catch (error) {
        setError('Failed to fetch organization details.');
        console.error('Error fetching organization:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganization();
  }, [id]);

  const handleDelete = async () => {
    const token = localStorage.getItem('accessToken'); 
    if (!token) {
      alert('No access token found. Please log in again.');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this organization?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:5000/organizations/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        alert('Organization deleted successfully.');
        navigate('/admin/organizations'); 
      } catch (error) {
        console.error('Error deleting organization:', error);
        alert('Failed to delete organization.');
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="dashboard-overview">
      <AdminNavBar />
      <div className="dashboard-container">
        <div className="dashboard-main-content">
          <h2>Organization Details</h2>
          <p><strong>Name:</strong> {organization.name}</p>
          <p><strong>Contact Info:</strong> {organization.contactInfo}</p>
          <p><strong>Address:</strong> {organization.address}</p>
          <OrganizationForm organization={organization} setOrganization={setOrganization} />
          <button onClick={handleDelete} style={{ color: 'red', marginTop: '20px' }}>
            Delete Organization
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationDetails; 
