import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage"; // Composant de la Landing Page
import CalendarPage from "./pages/CalendarPage"; // Page avec Header et Sidebar
import Profile from "./components/Profile"; // Composant Profile
import SignUpPage from "./pages/SignUp";
import "./App.css";
import Login from "./components/Login";
<<<<<<< HEAD
import Signup from "./components/Signup";
import Dashbroard from "./components/Dashbroard"; // Corrigé l'orthographe de Dashboard
import Sidbar from "./components/Sidbar"; // Corrigé l'orthographe de Sidebar
import TaskLandingPage from "./components/TaskLandingPage";
import Composant2 from "./components/Composant2";
import Composant3 from "./components/Composant3";
import Composant4 from "./components/Composant4";
import Wissal from "./components/Wissal";
import Stay from "./components/Stay";
import Seamless from "./components/Seamless";
import Work from "./components/Work";
import TaskPage from "./components/TaskPage";

import "./App.css"; // Assurez-vous d'importer le fichier CSS
import Continue1 from "./components/Continue1"; // Vérifiez qu'il n'y a qu'une seule importation.

=======
>>>>>>> ff1ed736e4b0905b7a8463abab681f64d0bcb03d
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
<<<<<<< HEAD
      <div className="parent-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<TaskLandingPage />} />
          <Route path="/composant2" element={<Composant2 />} />
          <Route path="/composant3" element={<Composant3 />} />
          <Route path="/composant4" element={<Composant4 />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashbroard />} />
          <Route path="/sidebar" element={<Sidbar />} />
          <Route path="/wissal" element={<Wissal />} />
          <Route path="/stay" element={<Stay />} />
          <Route path="/seamless" element={<Seamless />} />
        </Routes>
        <Stay />
        <Seamless />

        <Footer />
        <TaskPage />
=======
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
          <Route
            path="/signup"
            element={
              <SignUpPage  />
            }
          />
          <Route
            path="/login"
            element={
              <Login  />
            }
          />
        </Routes>
>>>>>>> ff1ed736e4b0905b7a8463abab681f64d0bcb03d
      </div>
    </Router>
  );
}

export default App;
