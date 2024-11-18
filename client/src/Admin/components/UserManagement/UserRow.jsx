import React, { useState } from 'react';
import UserDetailModal from './UserDetailModal';

const UserRow = ({ user, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    
    const handleModalOpen = () => setIsModalOpen(true);

    
    const handleDelete = () => {
        if (window.confirm(`Are you sure you want to delete user ${user.username}?`)) {
            onDelete(user.user_id);  
        }
    };

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
            {isModalOpen && <UserDetailModal user={user} closeModal={() => setIsModalOpen(false)} />}
        </tr>
    );
};

export default UserRow;
