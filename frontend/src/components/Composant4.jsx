import React from 'react';
import '../styles/Composant4.css';

// Importation de l'image depuis src/assets/images
import ComposantImage from '../assets/images/composant.png';

const Composant4 = () => {
  return (
    <div className="composant4-container">
      <img
        src={ComposantImage}
        alt="The Ways We Work"
        className="composant4-image"
      />
      <div className="composant4-content">
        <h2>The Ways We Work</h2>
        <p>How has our relationship with work changed?</p>
        <button
          className="composant4-button"
          onClick={() => window.open('https://example.com', '_blank')}
        >
          View the report →
        </button>
      </div>
    </div>
  );
};

export default Composant4;
