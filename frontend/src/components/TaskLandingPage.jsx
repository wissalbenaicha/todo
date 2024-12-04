import React from 'react';
import './TaskLandingPage.css'; // On inclura le CSS ensuite

function TaskLandingPage() {
  return (
    <div className="task-landing-page">
      <div className="left-section">
        <h1>Your Ultimate Task Management Solution</h1>
        <p>
          Our to-do list website helps you efficiently organize your daily tasks with a simple and intuitive interface. 
          Create, manage, and track your priorities in just a few clicks to stay productive every day.
        </p>
        <form>
          <input type="email" placeholder="Enter your work email" required />
          <button type="submit">Sign up free →</button>
        </form>
        <p>Collaborate with your team within minutes</p>
        <div className="reviews">
          <span>⭐⭐⭐⭐⭐ Based on 5,149+ reviews:</span>
          <img src="getapp_logo.png" alt="GetApp" />
          <img src="capterra_logo.png" alt="Capterra" />
        </div>
      </div>

      <div className="right-section">
        <img src="task_preview.png" alt="Task Preview" />
      </div>
    </div>
  );
}

export default TaskLandingPage;

