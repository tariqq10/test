import React, { useState } from 'react';
import { FaUserPlus, FaEnvelope } from 'react-icons/fa'; // Import icons
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Manage modal state for adding new project
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Manage profile dropdown state
  const [newProject, setNewProject] = useState({ name: '', deadline: '', progress: 0 });

  // Function to toggle the modal for adding a project
  const handlePlusClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  // Function to toggle the profile dropdown
  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  // Handle form input changes for adding a new project
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject((prevProject) => ({ ...prevProject, [name]: value }));
  };

  // Function to submit new project
  const handleAddProject = (e) => {
    e.preventDefault();
    console.log('New Project:', newProject); // You can replace this with the actual logic to add the project
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div className="flex flex-col p-6 bg-background">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">DASHBOARD</h1>
        <div className="flex items-center">
          <input type="text" placeholder="Search" className="input" />
          <button className="ml-2 p-2 bg-primary text-primary-foreground rounded">🔍</button>
          <button
            onClick={handlePlusClick}
            className="ml-2 p-2 bg-secondary text-secondary-foreground rounded"
          >
            +
          </button>
          <button className="ml-2 p-2 bg-muted text-muted-foreground rounded">🔔</button>
          <span className="ml-2 text-muted-foreground cursor-pointer" onClick={handleProfileClick}>
            Admin {/* Toggle profile dropdown */}
          </span>
          {isProfileOpen && (
            <div className="absolute top-12 right-4 p-4 bg-white shadow-lg rounded-lg">
              <p className="text-lg font-semibold">User Profile</p>
              <p>Name: John Doe</p>
              <p>Email: john.doe@example.com</p>
              <p>Role: Admin</p>
              {/* Add more details as needed */}
              <button
                onClick={() => alert('Edit Profile')}
                className="mt-2 p-2 bg-primary text-white rounded"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <span className="text-lg font-semibold">HOME</span>
        <span className="text-muted-foreground">December, 12</span>
      </div>

      {/* Statistics section */}
      {/* <div className="flex space-x-4 mb-4">
        <div className="text-center">
          <span className="text-xl font-bold">45</span>
          <p className="text-muted-foreground">In Progress</p>
        </div>
        <div className="text-center">
          <span className="text-xl font-bold">24</span>
          <p className="text-muted-foreground">Upcoming</p>
        </div>
        <div className="text-center">
          <span className="text-xl font-bold">62</span>
          <p className="text-muted-foreground">Total Projects</p>
        </div>
      </div> */}

      {/* Project Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-orange-200 p-6 rounded-lg">
          <h2 className="font-semibold">Project A</h2>
          <div className="mt-2">
            <span className="text-muted-foreground">Progress</span>
            <div className="relative mt-1">
              <div className="h-2 bg-orange-500" style={{ width: '60%' }}></div>
            </div>
            <span className="text-muted-foreground">60%</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-muted-foreground">2 Days Left</span>
            <button className="bg-primary text-primary-foreground p-1 rounded">+</button>
          </div>
        </div>
      </div>

      {/* Modal for adding a new project */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Add New Project</h2>
            <form onSubmit={handleAddProject}>
              <input
                type="text"
                name="name"
                placeholder="Project Name"
                value={newProject.name}
                onChange={handleInputChange}
                className="input mb-2"
              />
              <input
                type="date"
                name="deadline"
                placeholder="Deadline"
                value={newProject.deadline}
                onChange={handleInputChange}
                className="input mb-2"
              />
              <input
                type="number"
                name="progress"
                placeholder="Progress (%)"
                value={newProject.progress}
                onChange={handleInputChange}
                className="input mb-2"
                max="100"
                min="0"
              />
              <button type="submit" className="p-2 bg-primary text-white rounded mt-2">
                Add Project
              </button>
              <button onClick={handlePlusClick} className="p-2 bg-secondary text-white rounded mt-2">
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
