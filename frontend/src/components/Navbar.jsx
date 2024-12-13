import React, { useState } from "react";
import "../styles/Navbar.css"; // Assurez-vous que le chemin est correct
import logo from "../assets/images/logo.png"; // L'importation de l'image du logo

const Navbar = () => {
  const [showSolutions, setShowSolutions] = useState(false);
  const [showRessources, setShowRessources] = useState(false);

  return (
    <nav>
<<<<<<< HEAD
      <div className="navbar-container">
=======
      <div className="container">
>>>>>>> 7aa479446df27b751c623f9072ef8271f92bbf28
        {/* Menu de gauche avec logo */}
        <ul className="navbar-left">
          <li className="logo">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </li>
<<<<<<< HEAD
          <li 
            onMouseEnter={() => setShowSolutions(true)} 
=======
          <li
            onMouseEnter={() => setShowSolutions(true)}
>>>>>>> 7aa479446df27b751c623f9072ef8271f92bbf28
            onMouseLeave={() => setShowSolutions(false)}
          >
            Solutions
            <i className="fas fa-caret-down"></i> {/* L'icône caret-down */}
            {showSolutions && (
              <ul className="dropdown">
                <li>Option 1</li>
                <li>Option 2</li>
              </ul>
            )}
          </li>

<<<<<<< HEAD
          <li 
            onMouseEnter={() => setShowRessources(true)} 
=======
          <li
            onMouseEnter={() => setShowRessources(true)}
>>>>>>> 7aa479446df27b751c623f9072ef8271f92bbf28
            onMouseLeave={() => setShowRessources(false)}
          >
            Ressources
            <i className="fas fa-caret-down"></i> {/* L'icône caret-down */}
            {showRessources && (
              <ul className="dropdown">
                <li>Option 1</li>
                <li>Option 2</li>
              </ul>
            )}
          </li>

<<<<<<< HEAD
          {/* Liens de navigation */}
          <li><a href="/about">About</a></li>
          <li><a href="/help">Help</a></li>
=======
          <li>About</li>
          <li>Help</li>
>>>>>>> 7aa479446df27b751c623f9072ef8271f92bbf28
        </ul>

        {/* Menu de droite */}
        <ul className="navbar-right">
          <li>
<<<<<<< HEAD
            <i className="fas fa-globe"></i> {/* Icône pour changer la langue */}
          </li>
          <li><a href="/contact">Contact</a></li>
          {/* Convertir Login en lien */}
          <li><a href="/login">Login</a></li>
          {/* Convertir le bouton Sign Up en lien */}
          <li className="btnli">
            <a href="/signup" className="btn-signup">
              Sign Up for Free <i className="fas fa-chevron-right"></i>
            </a>
=======
            <i className="fas fa-globe"></i>{" "}
            {/* Icône pour changer la langue */}
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li className="btnli">
            <button className="btn-signup">
              Sign Up for Free <i className="fas fa-chevron-right"></i>
            </button>
>>>>>>> 7aa479446df27b751c623f9072ef8271f92bbf28
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
