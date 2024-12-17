import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MdDashboard, MdEvent, MdCheckCircle, MdSettings, MdExitToApp } from 'react-icons/md'; // Import des nouvelles icônes
import '../styles/sidbar.css';
import logo from '../assets/images/logo.png';

const Sidbar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="planify logo" />
      </div>
      <ul className="menu">
        <li>
          <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
            <MdDashboard className="icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/tasks" className={location.pathname === "/tasks" ? "active" : ""}>
            <MdCheckCircle className="icon" /> Tasks
          </Link>
        </li>
        <li>
          <Link to="/calendar" className={location.pathname === "/calendar" ? "active" : ""}>
            <MdEvent className="icon" /> Calendar
          </Link>
        </li>
      </ul>
      <ul className="bottom-menu">
        <li>
          <Link to="/settings" className={location.pathname === "/settings" ? "active" : ""}>
            <MdSettings className="icon" /> Settings
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <MdExitToApp className="icon" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidbar;
