import React from "react";
import "../styles/Continue1.css";
import logo from "../assets/images/logo.png"; // L'importation de l'image du logo

function Continue1() {
  return (
    <div className="first-task-page">
      <div className="container">
        <header className="header">
          <img src={logo} alt="Logo" className="logo" />

        </header>
        <div className="content">
          <div className="task-form">
            <h2>Add your first task</h2>
            <div className="input-container">
              <input
                type="text"
                placeholder="task name"
                className="task-input"
              />
              <div className="task-options">
                <span className="icon">📅</span>
                <span className="icon">📂</span>
                <span className="icon">📝</span>
              </div>
            </div>
            <button className="continue-btn">continue</button>
          </div>
          <div className="task-preview">
            <div className="step">
              <span>étape 2/2</span>
            </div>
            <div className="message">
              <p>
                <strong>hello User,</strong>
                <br />
                it’s time to add your first task
              </p>
            </div>
            <div className="design"></div>
          </div>
        </div>
        <footer>
          <button className="back-btn">←</button>
        </footer>
      </div>
    </div>
  );
}

export default Continue1;
