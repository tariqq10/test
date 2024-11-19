import React, { useState, useCallback } from 'react';
import UserDetailsModal from './UserDetailsModal';

const UserRow = ({ user, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = useCallback(() => setIsModalOpen(true), []);
  const handleDelete = useCallback(() => {
    if (window.confirm(`Are you sure you want to delete user ${user.username}?`)) {
      onDelete(user.user_id);
    }
  }, [user.user_id, onDelete]);

  return (
    <tr>
      <td>{user.user_id}</td>
      <td>{user.username}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
      <td>
        <button onClick={handleModalOpen}>View/Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
      {isModalOpen && <UserDetailsModal user={user} closeModal={() => setIsModalOpen(false)} />}
    </tr>
  );
};

export default UserRow; 
