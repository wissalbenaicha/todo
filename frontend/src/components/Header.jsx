import React from "react";
import "../styles/Header.css"; // Style associé
import profileImage from "../assets/images/profile.jpg"; // Image du profil par défaut
import { FaSearch, FaBell } from "react-icons/fa"; // Icônes

const Header = ({ onProfileClick, onNotificationClick, notificationCount }) => {
    return (
      <header className="header">
        {/* Zone de recherche */}
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
  
        {/* Icône de notification avec un compteur dynamique */}
        <div
          className="notification-container"
          onClick={onNotificationClick}
        >
          <FaBell className="notification-icon" />
          {notificationCount > 0 && <span className="notification-dot">{notificationCount}</span>}
        </div>
  
        {/* Section profil */}
        <div className="profile-container" onClick={onProfileClick}>
          <img src={profileImage} alt="Profile" className="profile-image" />
          <div className="profile-info">
            <p className="profile-name">Angela L.</p>
            <p className="profile-role">Project Manager</p>
          </div>
          <div className="dropdown-icon">▼</div>
        </div>
      </header>
    );
  };
  

export default Header;
