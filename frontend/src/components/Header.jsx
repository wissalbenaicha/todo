import React, { useState } from "react";
import "../styles/Header.css"; // Style associé
import profileImage from "../assets/images/profile.jpg"; // Image du profil par défaut
import { FaSearch, FaBell } from "react-icons/fa";
import Profile from "../components/Profile"; // Importation du composant Profile
import "../styles/Profile.css"; 


const Header = ({ onNotificationClick, notificationCount }) => {
  const [showProfile, setShowProfile] = useState(false); // État pour afficher Profile

  // Gestion du clic sur le profil
  const handleProfileClick = () => {
    setShowProfile(!showProfile); // Inverse l'état
  };

  return (
    <>
      {/* Barre de navigation */}
      <header className="header">
        {/* Zone de recherche */}
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>

        {/* Icône de notification */}
        <div className="notification-container" onClick={onNotificationClick}>
          <FaBell className="notification-icon" />
          {notificationCount > 0 && (
            <span className="notification-dot">{notificationCount}</span>
          )}
        </div>

        {/* Section profil */}
        <div className="profile-container" onClick={handleProfileClick}>
          <img src={profileImage} alt="Profile" className="profile-image" />
          <div className="profile-info">
            <p className="profile-name">Angela L.</p>
            <p className="profile-role">Project Manager</p>
          </div>
          <div className="dropdown-icon">▼</div>
        </div>
      </header>

      {/* Affichage conditionnel du composant Profile */}
      {showProfile && (
        <div className="profile-modal">
          <Profile /> {/* Le composant Profile s'affiche ici */}
        </div>
      )}
    </>
  );
};

export default Header;
