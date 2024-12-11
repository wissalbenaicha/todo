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
  );
}

export default App;
