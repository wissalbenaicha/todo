import React from "react";
import Navbar from "./components/Navbar";
import Faq from "./components/Faq";
import Footer from "./components/Footer";
import "./App.css";
import Wissal from "./components/Wissal";
import Stay from "./components/Stay";
import Seamless from "./components/Seamless";
import logo from "./logo.svg";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Wissal />
      <Stay />
      <Seamless />
      <Faq />
      <Footer />
    </div>
  );
}

export default App;
