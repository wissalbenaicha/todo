import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaTachometerAlt, FaCalendarAlt, FaTasks, FaCog, FaSignOutAlt } from 'react-icons/fa'; // Import des icônes
import '../styles/sidbar.css'; // Import du fichier CSS
import logo from '../assets/images/logo.png';

const Sidbar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="planify logo" />
      </div>
      <ul className="menu">
        <li>
          <Link to="/home">
            <FaHome className="icon" /> {/* Icône pour Home */}
            Home
          </Link>
        </li>
        <li>
          <Link to="/dashboard">
            <FaTachometerAlt className="icon" /> {/* Icône pour Dashboard */}
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/calendar">
            <FaCalendarAlt className="icon" /> {/* Icône pour Calendar */}
            Calendar
          </Link>
        </li>
        <li>
          <Link to="/tasks">
            <FaTasks className="icon" /> {/* Icône pour Tasks */}
            Tasks
          </Link>
        </li>
      </ul>
      <ul className="bottom-menu">
        <li>
          <Link to="/settings">
            <FaCog className="icon" /> {/* Icône pour Settings */}
            Settings
          </Link>
        </li>
        <li>
          <Link to="/logout">
            <FaSignOutAlt className="icon" /> {/* Icône pour Logout */}
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidbar;
