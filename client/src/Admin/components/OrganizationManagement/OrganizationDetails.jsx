// src/Admin/components/OrganizationManagement/OrganizationDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import OrganizationForm from './OrganizationForm';

const OrganizationDetails = () => {
  const { id } = useParams();
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      try {
        const response = await axios.get(`/api/organizations/${id}`);
        setOrganization(response.data);
      } catch (error) {
        console.error('Error fetching organization:', error);
      }
    };

    fetchOrganization();
  }, [id]);

  if (!organization) return <p>Loading...</p>;

  return (
    <div>
      <h2>Organization Details</h2>
      <p><strong>Name:</strong> {organization.name}</p>
      <p><strong>Contact Info:</strong> {organization.contactInfo}</p>
      <p><strong>Address:</strong> {organization.address}</p>
      <OrganizationForm /> {/* Using the form to edit the details */}
    </div>
  );
};

export default OrganizationDetails;
