// UserList.jsx
import React, { useEffect, useState } from 'react';
import UserRow from './UserRow';
import "../../styles/userManagement.css";


const UserList = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const response = await fetch('/users'); // Adjust this URL based on your API config
        const data = await response.json();
        setUsers(data);
    };

    return (
        <div className="user-list">
            <h2>User Management</h2>
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
                        <UserRow key={user.id} user={user} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserList;
