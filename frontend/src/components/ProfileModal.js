import React from "react";

const ProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Profile</h2>
        <p>Some profile details here</p>
        <button onClick={onClose} className="close-modal-btn">Close</button>
      </div>
    </div>
  );
};

export default ProfileModal;
