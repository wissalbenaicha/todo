import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashbroard"; // Correction du nom de "Dashbroard"
import Sidebar from "./components/Sidebar"; // Correction du nom de "Sidbar"
import TaskLandingPage from "./components/TaskLandingPage";
import Composant2 from "./components/Composant2";
import Composant3 from "./components/Composant3";
import Composant4 from "./components/Composant4";
import Wissal from "./components/Wissal";
import Stay from "./components/Stay";
import Seamless from "./components/Seamless";
import Work from "./components/Work";

import LandingPage from "./pages/LandingPage"; // Regroupe les composants de la Landing Page
import CalendarPage from "./pages/CalendarPage"; // Page avec Header, Sidebar et modal

import "./App.css";

function App() {
  return (
    <Router>
      <div className="parent-container">
        {/* Navbar affichée sur toutes les pages */}
        <Navbar />

        {/* Routes pour gérer les différentes pages */}
        <Routes>
          {/* Pages principales */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/task-landing" element={<TaskLandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sidebar" element={<Sidebar />} />

          {/* Pages supplémentaires */}
          <Route path="/composant2" element={<Composant2 />} />
          <Route path="/composant3" element={<Composant3 />} />
          <Route path="/composant4" element={<Composant4 />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Composants spécifiques */}
          <Route path="/wissal" element={<Wissal />} />
          <Route path="/stay" element={<Stay />} />
          <Route path="/seamless" element={<Seamless />} />
          <Route path="/work" element={<Work />} />
        </Routes>

        {/* Footer affiché sur toutes les pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
