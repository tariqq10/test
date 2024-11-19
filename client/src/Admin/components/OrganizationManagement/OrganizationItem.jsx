import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OrganizationItem = ({ organization, deleteOrganization, updateOrganization }) => {
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState({
    name: organization.name,
    contactInfo: organization.contactInfo,
    address: organization.address,
  });

  const handleDelete = () => {
    deleteOrganization(organization.id);
  };

  const handleUpdate = () => {
    updateOrganization(organization.id, editedData);
    setEditMode(false); 
  };

  return (
    <div className="organization-item">
      {editMode ? (
        <div>
          <input
            type="text"
            value={editedData.name}
            onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
          />
          <input
            type="text"
            value={editedData.contactInfo}
            onChange={(e) => setEditedData({ ...editedData, contactInfo: e.target.value })}
          />
          <input
            type="text"
            value={editedData.address}
            onChange={(e) => setEditedData({ ...editedData, address: e.target.value })}
          />
          <button onClick={handleUpdate}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{organization.name}</h3>
          <p>{organization.contactInfo}</p>
          <p>{organization.address}</p>
          <Link to={`/admin/organizations/${organization.id}`}>View Details</Link>
          <button onClick={() => setEditMode(true)}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default OrganizationItem;
