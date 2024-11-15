// src/Admin/components/OrganizationManagement/OrganizationForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const OrganizationForm = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Replaced useHistory with useNavigate
  
  const [organization, setOrganization] = useState({
    name: '',
    contactInfo: '',
    address: '',
  });

  useEffect(() => {
    if (id) {
      // Fetch existing organization details to edit
      const fetchOrganization = async () => {
        try {
          const response = await axios.get(`/api/organizations/${id}`);
          setOrganization(response.data);
        } catch (error) {
          console.error('Error fetching organization:', error);
        }
      };
      fetchOrganization();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrganization((prevOrg) => ({
      ...prevOrg,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        // Update existing organization
        await axios.put(`/api/organizations/${id}`, organization);
      } else {
        // Add new organization
        await axios.post('/api/organizations', organization);
      }
      navigate('/admin/organizations'); // Redirect after submit (replaces history.push)
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
          value={organization.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Contact Info:</label>
        <input
          type="text"
          name="contactInfo"
          value={organization.contactInfo}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={organization.address}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">{id ? 'Update Organization' : 'Add Organization'}</button>
    </form>
  );
};

export default OrganizationForm;
