import React from 'react';
import TaskLandingPage from './components/TaskLandingPage'; // Importation de TaskLandingPage
import './App.css'; // Garde le CSS général si nécessaire

function App() {
  return (
    <div className="App">
      <TaskLandingPage /> {/* Intégration de la nouvelle page */}
    </div>
  );
}

export default App;


