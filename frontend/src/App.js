import React from "react";
import "./App.css";
import Wissal from "./components/Wissal";
import logo from "./logo.svg";
function App() {
  return (
    <div className="App">
      <Wissal /> {/* Intégration de la nouvelle page */}
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        hello imene
      </header>
      <header className="App-header">hello imene</header>
      <wissal />
    </div>
  );
}

export default App;
