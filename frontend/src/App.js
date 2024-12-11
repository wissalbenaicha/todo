import React from 'react';
import TaskLandingPage from './components/TaskLandingPage';  // Si le fichier est dans le dossier 'components'
 // Import du premier composant
import Composant2 from './components/Composant2';  // Si le fichier est dans le sous-dossier 'components'
import Composant3 from './components/Composant3';
import Composant4 from './components/Composant4';

import './App.css';  // Assurez-vous d'importer le fichier CSS

function App() {
  return (
    <div className="parent-container">
      <TaskLandingPage />
      <Composant2 />
      <Composant3 />
      <Composant4 />
    </div>
  );
}

export default App;
