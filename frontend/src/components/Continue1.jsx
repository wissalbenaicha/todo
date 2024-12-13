import React, { useState } from "react";
import "../styles/Continue1.css";
import logo from "../assets/images/logo.png"; // Importing the logo image

function Continue1() {
  const [taskName, setTaskName] = useState(""); // State to store the task name
  const [message, setMessage] = useState(""); // Message to display errors or success

  // Function to handle data submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload

    // Check if the task name is entered
    if (!taskName) {
      setMessage("Please enter the task name.");
      return;
    }

    // Get CSRF token from cookies
    const csrfToken = document.cookie
      .split("; ")
      .find((row) => row.startsWith("csrftoken="))
      .split("=")[1];

    // Send data to the server
    try {
      const response = await fetch("/tasks/create/", {
        method: "POST",
        body: JSON.stringify({ title: taskName }),
        headers: {
          "Content-Type": "application/json", // Set content type as JSON
          "X-CSRFToken": csrfToken, // Include the CSRF token in the request headers
        },
      });

      const result = await response.json(); // Receive the server response

      if (response.ok) {
        setMessage("Task added successfully!");
        setTaskName(""); // Reset field after adding
      } else {
        setMessage(result.error || "An error occurred while adding the task.");
      }
    } catch (error) {
      setMessage("A connection error occurred with the server.");
    }
  };

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
                placeholder="Task name"
                className="task-input"
                value={taskName} // Bind the field to the state
                onChange={(e) => setTaskName(e.target.value)} // Update state on input
              />
              <div className="task-options">
                <span className="icon">📅</span>
                <span className="icon">📂</span>
                <span className="icon">📝</span>
              </div>
            </div>
            <button className="continue-btn" onClick={handleSubmit}>
              Continue
            </button>
            {/* Display success or error message */}
            {message && <p className="message">{message}</p>}
          </div>
          <div className="task-preview">
            <div className="step">
              <span>Step 2/2</span>
            </div>
            <div className="message">
              <p>
                <strong>Hello User,</strong>
                <br />
                It’s time to add your first task.
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
