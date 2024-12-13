import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import Login from "./components/Login";
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

import "./App.css"; // Assurez-vous d'importer le fichier CSS
import Continue1 from "./components/Continue1"; // Vérifiez qu'il n'y a qu'une seule importation.

function App() {
  return (
    <Router>
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
        <Work />

        <Footer />
        <Continue1 />
      </div>
    </Router>
  );
}

export default App;
