<<<<<<< HEAD
import React from 'react';
import Navbar from './components/Navbar';
import Faq from './components/Faq';
import Footer from './components/Footer'
const App = () => {
  return (
    <>
      <Navbar />
      <Faq />
      <Footer />
    </>
=======
import React from "react";
import "./App.css";
import Wissal from "./components/Wissal";
import Stay from "./components/Stay";
import Seamless from "./components/Seamless";

import logo from "./logo.svg";
function App() {
  return (
    <div className="App">
      <Wissal /> {/* Intégration de la nouvelle page */}
      <Stay />
      <Seamless />
    </div>
>>>>>>> f723886a05c08da00957e08567e187b721f54e84
  );
};

export default App;
