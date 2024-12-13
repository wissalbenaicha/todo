<<<<<<< HEAD
import React from "react";
import Navbar from "./components/Navbar";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import "./App.css";
import Wissal from "./components/Wissal";
import Stay from "./components/Stay";
import Seamless from "./components/Seamless";
import Work from "./components/Work";
import Continue1 from "./components/Continue1";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Wissal />
      <Stay />
      <Seamless />
      <Work />
      <Faq />
      <Footer />
      <Continue1 />
    </div>
=======
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashbroard from './components/Dashbroard';  // Corrigé l'orthographe de Dashboard
import Sidbar from './components/Sidbar';    // Corrigé l'orthographe de Sidebar
import TaskLandingPage from './components/TaskLandingPage';
import Composant2 from './components/Composant2';
import Composant3 from './components/Composant3';
import Composant4 from './components/Composant4';
import Wissal from './components/Wissal';
import Stay from './components/Stay';
import Seamless from './components/Seamless';
import './App.css';  // Assurez-vous d'importer le fichier CSS

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
        
        <Footer />
      </div>
    </Router>
>>>>>>> e184a80d4c60b7df93f721f81aa998aff2e1891d
  );
}

export default App;
