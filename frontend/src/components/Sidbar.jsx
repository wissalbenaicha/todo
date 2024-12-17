import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarAlt, FaTasks, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Home icon removed
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
            <FaTachometerAlt className="icon" /> Dashboard
          </Link>
        </li>
        <li>
          <Link to="/tasks" className={location.pathname === "/tasks" ? "active" : ""}>
            <FaTasks className="icon" /> Tasks
          </Link>
        </li>
        <li>
          <Link to="/calendar" className={location.pathname === "/calendar" ? "active" : ""}>
            <FaCalendarAlt className="icon" /> Calendar
          </Link>
        </li>
      </ul>
      <ul className="bottom-menu">
        <li>
          <Link to="/settings" className={location.pathname === "/settings" ? "active" : ""}>
            <FaCog className="icon" /> Settings
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <FaSignOutAlt className="icon" /> Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidbar;
