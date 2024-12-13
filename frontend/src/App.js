import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage'; // Regroupe les composants de la Landing Page
import CalendarPage from './pages/CalendarPage'; // Page avec Header, Sidebar et modal
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route pour la Landing Page */}
        <Route path="/" element={<LandingPage />} />
        {/* Route pour les pages avec Header et Sidebar */}
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
