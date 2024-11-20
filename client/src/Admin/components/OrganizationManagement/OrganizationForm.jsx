import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrganizationForm = ({ organization, setOrganization, createOrganization }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [orgData, setOrgData] = useState(organization || {
    name: '',
    contactInfo: '',
    address: '',
  });

  const token = localStorage.getItem('access_token'); 

  if (!token) {
    navigate('/login'); 
    return null; 
  }

  const headers = {
    Authorization: `Bearer ${token}`, 
  };

  useEffect(() => {
    if (id) {
      const fetchOrganization = async () => {
        try {
          const response = await axios.get(`http://127.0.0.1:5000/organizations/${id}`, { headers });
          setOrgData(response.data);
        } catch (error) {
          console.error('Error fetching organization:', error);
        }
      };
      fetchOrganization();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrgData((prevOrg) => ({
      ...prevOrg,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.patch(`http://127.0.0.1:5000/organizations/${id}`, orgData, { headers });
      } else {
        await axios.post('http://127.0.0.1:5000/organizations', orgData, { headers });
      }
      navigate('/admin/organizations'); 
    } catch (error) {
      console.error('Error saving organization:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={orgData.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Contact Info:</label>
        <input
          type="text"
          name="contactInfo"
          value={orgData.contactInfo}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={orgData.address}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">{id ? 'Update Organization' : 'Add Organization'}</button>
    </form>
  );
};

export default OrganizationForm; 
