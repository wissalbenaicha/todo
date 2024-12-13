import React from "react";
import { Link } from "react-router-dom"; // Pour naviguer entre les pages
import "../styles/Sidebar.css"; // Assurez-vous de créer ce fichier CSS

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h1 className="logo">planify</h1>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li>
            <Link to="/home" className="nav-item">
              <i className="icon home-icon"></i> home
            </Link>
          </li>
          <li>
            <Link to="/dashboard" className="nav-item">
              <i className="icon dashboard-icon"></i> Dashboard
            </Link>
          </li>
          <li>
            <Link to="/calendar" className="nav-item active">
              <i className="icon calendar-icon"></i> Calendar
            </Link>
          </li>
          <li>
            <Link to="/tasks" className="nav-item">
              <i className="icon tasks-icon"></i> Tasks
            </Link>
          </li>
          <li>
            <Link to="/settings" className="nav-item">
              <i className="icon settings-icon"></i> Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
