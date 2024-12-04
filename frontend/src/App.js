import React from 'react';
import logo from './logo.svg';
import './App.css';
import Gho from './components/gho'; // Importation de ton composant

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Hello Imene</h1>
        <Gho /> {/* Affichage du composant Gho */}
      </header>
    </div>
  );
}

export default App;

