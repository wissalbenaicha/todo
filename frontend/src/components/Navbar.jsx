import React, { useState } from "react";
import "../styles/Navbar.css"; // Assurez-vous que le chemin est correct
import logo from "../assets/images/logo.png"; // L'importation de l'image du logo

const Navbar = () => {
  const [showSolutions, setShowSolutions] = useState(false);
  const [showRessources, setShowRessources] = useState(false);

  return (
    <nav>
      <div className="container">
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

          <li>About</li>
          <li>Help</li>
        </ul>

        {/* Menu de droite */}
        <ul className="navbar-right">
          <li>
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
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
