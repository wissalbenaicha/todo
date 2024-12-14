import React, { useState } from "react";
import "../styles/Profile.css";

function Profile({ onClose }) {
  const [name, setName] = useState("imene");
  const [email, setEmail] = useState("imene@test.com");
  const [phoneNumber, setPhoneNumber] = useState("+213 75896324");
  const [about, setAbout] = useState(
    "Lorem ipsum dolor sit amet consectetur. Erat auctor a aliquam vel congue luctus."
  );

  const handleEditField = (field, setValue) => {
    const newValue = prompt(`Edit ${field}:`);
    if (newValue !== null) setValue(newValue);
  };

  return (
    <div className="profile-overlay">
      <div className="profile-card">
        <button className="close-button" onClick={onClose}>
          Close
        </button>

        {/* En-tête : Photo et bouton Upload */}
        <div className="profile-header">
          <div className="photo-container">
          <img
                src="/assets/images/profile.jpg"
                alt="Profile"
                className="profile-image" />
          </div>
          <button className="upload-photo-button">Upload Photo</button>
        </div>

        {/* Informations */}
        <div className="profile-info">
          <div className="profile-field">
            <span className="field-label">Your Name:</span>
            <span className="field-value">{name}</span>
            <button onClick={() => handleEditField("Name", setName)}>
              Edit
            </button>
          </div>
          <div className="profile-field">
            <span className="field-label">Email:</span>
            <span className="field-value">{email}</span>
            <button onClick={() => handleEditField("Email", setEmail)}>
              Edit
            </button>
          </div>
          <div className="profile-field">
            <span className="field-label">Phone Number:</span>
            <span className="field-value">{phoneNumber}</span>
            <button onClick={() => handleEditField("Phone Number", setPhoneNumber)}>
              Edit
            </button>
          </div>
          <div className="profile-field">
            <span className="field-label">About:</span>
            <span className="field-value">{about}</span>
            <button onClick={() => handleEditField("About", setAbout)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
