import React, { useState } from "react";
import "../styles/Navbar.css"; // Assurez-vous que le chemin est correct
import logo from "../assets/images/logo.png"; // L'importation de l'image du logo

const Navbar = () => {
  const [showSolutions, setShowSolutions] = useState(false);
  const [showRessources, setShowRessources] = useState(false);

  return (
    <nav>
      <div className="navbar-container">
        {/* Menu de gauche avec logo */}
        <ul className="navbar-left">
          <li className="logo">
            <img src={logo} alt="Logo" className="navbar-logo" />
          </li>
          <li 
            onMouseEnter={() => setShowSolutions(true)} 
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

          <li 
            onMouseEnter={() => setShowRessources(true)} 
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

          {/* Liens de navigation */}
          <li><a href="/about">About</a></li>
          <li><a href="/help">Help</a></li>
        </ul>

        {/* Menu de droite */}
        <ul className="navbar-right">
          <li>
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
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
