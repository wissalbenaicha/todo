import React from 'react';
import '../styles/Composant2.css';

// Importation des logos depuis src/assets/images
import walmartLogo from '../assets/images/Walmart-logo.png';
import ciscoLogo from '../assets/images/cisco-logo.png';
import volvoLogo from '../assets/images/volvo-logo.png';
import deloitteLogo from '../assets/images/Deloitte-logo.png';
import oktaLogo from '../assets/images/Okta-logo.png';

function Composant2() {
  return (
    <div className="composant2-container">
      <h2 className="composant2-title">Trusted by 45M+ users</h2>
      <div className="composant2-logos">
        <img src={walmartLogo} alt="Walmart Logo" className="logo" />
        <img src={ciscoLogo} alt="Cisco Logo" className="logo" />
        <img src={volvoLogo} alt="Volvo Logo" className="logo" />
        <img src={deloitteLogo} alt="Deloitte Logo" className="logo" />
        <img src={oktaLogo} alt="Okta Logo" className="logo" />
      </div>
    </div>
  );
}

export default Composant2;
