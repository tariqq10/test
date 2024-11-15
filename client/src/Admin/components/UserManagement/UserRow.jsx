// UserRow.jsx
import React, { useState } from 'react';
import UserDetailModal from "./UserDetailModal";


const UserRow = ({ user }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleDelete = async () => {
        await fetch(`/users/${user.id}`, { method: 'DELETE' });
        // Optionally add state update logic here or trigger re-fetching users
    };

    return (
        <tr>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
                <button onClick={() => setIsModalOpen(true)}>View/Edit</button>
                <button onClick={handleDelete}>Delete</button>
            </td>
            {isModalOpen && <UserDetailsModal user={user} closeModal={() => setIsModalOpen(false)} />}
        </tr>
    );
};

export default UserRow;
