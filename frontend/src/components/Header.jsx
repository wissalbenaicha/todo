import React, { useState } from "react";
import NotificationList from "./NotificationList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import "../styles/Header.css";

const Header = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="header">
      <div className="logo">Mon Application</div>
      <div className="header-icons">
        {/* Icône FontAwesome */}
        <div className="notification-icon" onClick={toggleNotifications}>
          <FontAwesomeIcon icon={faBell} size="lg" />
          <span className="badge">3</span>
        </div>
      </div>

      {showNotifications && (
        <div className="notification-bar">
          <NotificationList />
        </div>
      )}
    </header>
  );
};

export default Header;
