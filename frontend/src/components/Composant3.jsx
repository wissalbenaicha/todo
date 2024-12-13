import React from 'react';
import '../styles/Composant3.css';

// Importation des logos depuis src/assets/images
import vmwareLogo from '../assets/images/vmware-logo.png';
import docusignLogo from '../assets/images/docusign-logo.png';
import frogLogo from '../assets/images/frog-logo.png';

function Composant3() {
  return (
    <div className="composant3-container">
      <h2 className="composant3-title">Loved by the world's best teams</h2>
      <div className="composant3-cards">
        <div className="composant3-card">
          <img src={vmwareLogo} alt="VMware" className="composant3-logo" />
          <p className="composant3-text">
            Planify has made managing my tasks effortless. Its simple and intuitive interface allows me to create, organize, and track tasks with ease.
          </p>
          <p className="composant3-author">Roxanne Mustafa, Design Team Lead at VMware</p>
        </div>
        <div className="composant3-card">
          <img src={docusignLogo} alt="DocuSign" className="composant3-logo" />
          <p className="composant3-text">
            I love the reminder and deadline features. They help me stay on top of important tasks without missing a thing.
          </p>
          <p className="composant3-author">Jane Ashley, Head of Design at DocuSign</p>
        </div>
        <div className="composant3-card">
          <img src={frogLogo} alt="Frog" className="composant3-logo" />
          <p className="composant3-text">
            Planify's cross-device access and sharing features are a game-changer. I can easily collaborate with colleagues, keeping everyone aligned.
          </p>
          <p className="composant3-author">Laura Baird, Associate Design Director at Frog</p>
        </div>
      </div>
      <button className="composant3-button">See all customer stories →</button>
    </div>
  );
}

export default Composant3;
