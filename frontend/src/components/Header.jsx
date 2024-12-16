import React, { useState, useEffect, useRef } from "react";
import "../styles/Header.css"; // Importation des styles
import profileImage from "../assets/images/profile.jpg"; // Image du profil
import { FaSearch } from "react-icons/fa"; // Icône de recherche
import { IoNotificationsOutline } from "react-icons/io5"; // Nouvelle icône de notification
import Profile from "../components/Profile"; // Composant Profil
import NotificationList from "../components/NotificationList"; // Composant Liste Notifications

const Header = ({ notificationCount }) => {
  const [showProfile, setShowProfile] = useState(false); // État pour afficher Profile
  const [showNotifications, setShowNotifications] = useState(false); // État pour afficher Notifications
  const notificationRef = useRef(); // Référence pour le modal

  // Gestion du clic sur le profil
  const handleProfileClick = () => {
    setShowProfile(!showProfile);
  };

  // Gestion du clic sur l'icône de notification
  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  // Gestion du clic en dehors pour fermer le modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false); // Fermer le modal
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
        <div className="notification-container" onClick={handleNotificationClick}>
          <IoNotificationsOutline className="notification-icon" />
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

      {/* Affichage de la liste des notifications */}
      {showNotifications && (
        <div className="notification-modal" ref={notificationRef}>
          <NotificationList />
        </div>
      )}

      {/* Affichage conditionnel du profil */}
      {showProfile && (
        <div className="profile-modal">
          <Profile />
        </div>
      )}
    </>
  );
};

export default Header;
