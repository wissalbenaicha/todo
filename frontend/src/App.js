import React from 'react';
import TaskLandingPage from './components/TaskLandingPage';  // Si le fichier est dans le dossier 'components'
 // Import du premier composant
import Composant2 from './components/Composant2';  // Si le fichier est dans le sous-dossier 'components'
import Composant3 from './components/Composant3';
import Composant4 from './components/Composant4';

import './App.css';  // Assurez-vous d'importer le fichier CSS
import React from "react";
import Navbar from "./components/Navbar";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import "./App.css";
import Wissal from "./components/Wissal";
import Stay from "./components/Stay";
import Seamless from "./components/Seamless";

import logo from "./logo.svg";
function App() {
  return (
    <div className="parent-container">
      <TaskLandingPage />
      <Composant2 />
      <Composant3 />
      <Composant4 />
        
    <div className="App">
      <Navbar />
      <Faq />
      <Footer />
      <Wissal />
      <Stay />
      <Seamless />
    </div>
    </div>
  );
}

export default App;
