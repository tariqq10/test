import React, { useEffect, useState } from 'react';
import UserRow from './UserRow';
import "../../styles/userManagement.css";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    
    const adminToken = localStorage.getItem('accessToken'); 

    useEffect(() => {
        if (adminToken) {
            fetchUsers(); 
        } else {
            setError('No admin token found. Please log in.');
        }
    }, [adminToken]); 

    
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://127.0.0.1:5000/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }

            const data = await response.json();
            setUsers(data);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    // Delete a user by ID
    const deleteUser = async (userId) => {
        try {
            const response = await fetch(`http://127.0.0.1:5000/users/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${adminToken}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setUsers(users.filter(user => user.user_id !== userId)); 
            } else {
                throw new Error('Failed to delete user');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="user-list">
            <h2>User Management</h2>
            {loading && <p>Loading users...</p>}
            {error && <p className="error">{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <UserRow
                            key={user.user_id}
                            user={user}
                            onDelete={deleteUser} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
