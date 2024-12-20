import React, { useState } from "react";
import "../styles/Navbar.css"; // Assurez-vous que le chemin est correct
import logo from "../assets/images/logo.png"; // L'importation de l'image du logo

const Navbar = () => {
  const [showSolutions, setShowSolutions] = useState(false);
  const [showRessources, setShowRessources] = useState(false);
  const [menuActive, setMenuActive] = useState(false); // Etat pour afficher/masquer le menu complet

  return (
    <nav>
      <div className="navbar-container">
        {/* Logo */}
          <img src={logo} alt="logo" className="navbar-logo" />

        {/* Hamburger Menu */}
        <div className="hamburger" onClick={() => setMenuActive(!menuActive)}>
          <i className="fas fa-bars"></i> {/* Icône hamburger */}
        </div>

        {/* Menu de gauche et de droite, masqués par défaut sur petit écran */}
        <ul className={`navbar-left ${menuActive ? "active" : ""}`}>
          <li 
            onMouseEnter={() => setShowSolutions(true)} 
            onMouseLeave={() => setShowSolutions(false)}
          >
            Solutions
            <i className="fas fa-caret-down"></i>
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
            <i className="fas fa-caret-down"></i>
            {showRessources && (
              <ul className="dropdown">
                <li>Option 1</li>
                <li>Option 2</li>
              </ul>
            )}
          </li>

          <li><a href="/about">About</a></li>
          <li><a href="/help">Help</a></li>
        </ul>

        {/* Menu de droite */}
        <ul className={`navbar-right ${menuActive ? "active" : ""}`}>
          <li>
            <i className="fas fa-globe"></i>
          </li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/login">Login</a></li>
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
