import React from 'react';
import './TaskLandingPage.css';

function TaskLandingPage() {
  return (
    <div className="task-landing-container">
      <div className="task-landing-content">
        <h1>Your Ultimate Task Management Solution</h1>
        <p>
          Our to-do list website helps you efficiently organize your daily tasks with a simple and intuitive interface. 
          Create, manage, and track your priorities in just a few clicks to stay productive every day.
        </p>
        <div className="task-landing-form">
          <input 
            type="email" 
            placeholder="Enter your work email" 
            className="task-email-input"
          />
          <button className="task-signup-button">Sign up free →</button>
        </div>
      </div>
    </div>
  );
}

export default TaskLandingPage;

