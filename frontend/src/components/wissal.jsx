import React from "react";
import "./Wissal.css";

function Wissal() {
  return (
    <div className="features">
      <div className="title">
        <h1>Simplify Your Daily Planning</h1>
      </div>

      <div className="container">
        <div className="feat">
          <h3>Task Management</h3>
          <p>
            Task Management: Easily create, edit, and delete tasks. Organize
            your tasks into categories, set priorities, and keep track of your
            progress to stay on top of your daily responsibilities.
          </p>
        </div>
        <div className="feat">
          <h3>User Accounts</h3>
          <p>
            Securely register and log in to your account. Your tasks are saved
            and synced, allowing you to access them from any device at any time,
            ensuring a seamless experience.
          </p>
        </div>
        <div className="feat">
          <h3>Notifications and Deadlines</h3>
          <p>
            Set reminders and due dates to never miss important tasks. Receive
            notifications to keep you on track and stay productive throughout
            your day.
          </p>
        </div>
      </div>
      <a href="#" className="more">
        Sign up free →
      </a>
    </div>
  );
}

export default Wissal;
