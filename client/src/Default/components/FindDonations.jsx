import React, { useState } from 'react';
import { FaUserPlus, FaEnvelope } from 'react-icons/fa'; // Import icons
import '../styles/FindDonations.css'; 

const FindDonations = () => {
  const [participants, setParticipants] = useState([
    "https://images.unsplash.com/photo-1719937050446-a121748d4ba0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    "https://images.unsplash.com/photo-1719937050446-a121748d4ba0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
  ]);

  const handleAddParticipant = () => {
    // Logic to add a new participant image (this can be dynamic)
    setParticipants([...participants, "profile3.jpg"]);
  };

  const handleSendMessage = () => {
    // Functionality for sending a message (e.g., show alert or open a modal)
    alert('Message Sent!');
  };

  return (
    <section className="projects-section">
      <div className="projects-section-header">
        <p>Find Donations</p>
        <div className="time">Time Left: 12 Days</div>
      </div>
      
      <div className="project-boxes jsGridView">
        <div className="project-box-wrapper">
          <div className="project-box-header">
            <span>Ongoing Project</span>
          </div>
          <div className="project-box-content-header">
            <p className="box-content-header">Fundraiser for Education</p>
            <p className="box-content-subheader">Help support underprivileged students</p>
          </div>
          <div className="box-progress">
            <div className="box-progress-bar">
              <div className="box-progress-header">Progress</div>
              <div className="box-progress-percentage">70%</div>
            </div>
          </div>
          <div className="project-box-footer">
            <div className="participants">
              {participants.map((participant, index) => (
                <img key={index} src={participant} alt={`Participant ${index + 1}`} />
              ))}
              <button className="add-participant" onClick={handleAddParticipant}>
                <FaUserPlus /> {/* Plus Icon */}
              </button>
            </div>
            <div className="days-left">12 Days Left</div>
          </div>
        </div>
      </div>

      <button className="messages-btn" onClick={handleSendMessage}>
        <FaEnvelope /> <span>Send Message</span> {/* Envelope Icon */}
      </button>
    </section>
  );
};

export default FindDonations;
