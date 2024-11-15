// UserDetailsModal.jsx
import React, { useState } from 'react';

const UserDetailsModal = ({ user, closeModal }) => {
    const [updatedUser, setUpdatedUser] = useState(user);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    const handleUpdate = async () => {
        await fetch(`/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedUser),
        });
        closeModal();
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Edit User Details</h3>
                <label>
                    Username:
                    <input type="text" name="username" value={updatedUser.username} onChange={handleInputChange} />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" value={updatedUser.email} onChange={handleInputChange} />
                </label>
                <label>
                    Role:
                    <select name="role" value={updatedUser.role} onChange={handleInputChange}>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>
                </label>
                <button onClick={handleUpdate}>Save Changes</button>
                <button onClick={closeModal}>Cancel</button>
            </div>
        </div>
    );
};

export default UserDetailsModal;
