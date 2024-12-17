import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Composant de la Landing Page
import CalendarPage from "./pages/CalendarPage"; // Page avec Header et Sidebar
import Profile from "./components/Profile"; // Composant Profile
import SignUpPage from "./pages/SignUp";
import "./App.css";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyEmail";
import DashboardPage from "./pages/DashboardPage";
import TachePage from "./pages/TachePage";
import TachePage2 from "./pages/TachePage2";


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
            <Profile onClose={closeProfile} />{" "}
            {/* Passe la fonction pour fermer */}
          </div>
        )}

        {/* Configuration des routes */}
        <Routes>
          {/* Route pour la Landing Page */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />
          {/* Route pour la Tache Page */}
          <Route path="/" element={<TachePage />} />
          <Route path="/TachePage" element={<TachePage />} />
                    {/* Route pour la Tache Page 2 */}
                    <Route path="/" element={<TachePage2 />} />
          <Route path="/TachePage2" element={<TachePage2 />} />

          {/* Route pour CalendarPage */}
          <Route
            path="/calendar"
            element={<CalendarPage onProfileClick={handleProfileClick} />}
          />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />{" "}
          {/* Route pour la vérification */}
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
