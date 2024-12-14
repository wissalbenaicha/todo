import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Composant de la Landing Page
import CalendarPage from "./pages/CalendarPage"; // Page avec Header et Sidebar
import Profile from "./components/Profile"; // Composant Profile
import "./App.css";

function App() {
  // État pour gérer l'affichage du profil
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  // Fonction pour afficher/masquer le profil
  const handleProfileClick = () => {
    setIsProfileVisible((prev) => !prev);
  };

  // Fonction pour fermer le profil
  const closeProfile = () => {
    setIsProfileVisible(false);
  };

  return (
    <Router>
      <div className="app">
        {/* Affichage conditionnel du Profile en overlay */}
        {isProfileVisible && (
          <div className="profile-overlay">
            <Profile onClose={closeProfile} /> {/* Passe la fonction pour fermer */}
          </div>
        )}

        {/* Configuration des routes */}
        <Routes>
          {/* Route pour la Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />

          {/* Route pour CalendarPage */}
          <Route
            path="/calendar"
            element={
              <CalendarPage onProfileClick={handleProfileClick} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
