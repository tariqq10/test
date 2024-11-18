import React, { useState } from 'react';

const UserDetailsModal = ({ user, closeModal }) => {
    const [updatedUser, setUpdatedUser] = useState(user);


    const accessToken = localStorage.getItem('accessToken');

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser({ ...updatedUser, [name]: value });
    };

    
    const handleUpdate = async () => {
        if (!accessToken) {
            alert('User is not authenticated. Please log in.');
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/users/${user.user_id}`, {
                method: 'PATCH',  
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`,  
                },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) {
                throw new Error('Failed to update user');
            }

            
            closeModal();
            alert('User updated successfully!');
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Failed to update user. Please try again.');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h3>Edit User Details</h3>
                <label>
                    Username:
                    <input
                        type="text"
                        name="first_name"
                        value={updatedUser.first_name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="last_name"
                        value={updatedUser.last_name}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Email:
                    <input
                        type="email"
                        name="email"
                        value={updatedUser.email}
                        onChange={handleInputChange}
                    />
                </label>
                <label>
                    Role:
                    <select
                        name="role"
                        value={updatedUser.role}
                        onChange={handleInputChange}
                    >
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
