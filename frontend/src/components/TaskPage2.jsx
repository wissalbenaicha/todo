import React from "react";
import Sidbar from "./Sidbar";
import Header from "./Header";
import { FaUserCircle } from "react-icons/fa";
import "../styles/TaskPage2.css"; // Assurez-vous d'avoir ce fichier CSS

const TasksPage2 = () => {
  return (
    <div className="tasks-page">
      {/* Sidebar */}
      <Sidbar />

      {/* Contenu principal */}
      <div className="main-content">
        {/* Header */}
        <Header notificationCount={3} />

        {/* Section principale des tâches */}
        <div className="tasks-container">
          <div className="container">
            {/* En-tête des tâches */}
            <div className="tasks-header">
              <h2>My tasks</h2>
              <button className="add-task-btn">+ Add new task</button>
            </div>

            {/* Statuts des tâches */}
            <div className="tasks-status">
              <span className="status in-progress">in progress</span>
              <span className="status">Completed</span>
              <span className="status">Not Started</span>
            </div>

            {/* Cartes des tâches */}
            <div className="task-cards">
              {/* Carte 1 */}
              <div className="task-card">
                <p className="task-category task-blue">Design</p>
                <h3 className="task-title">
                  Create User Interface for New Project
                </h3>
                <p className="task-description">
                  Develop wireframes and mockups for the upcoming project. Focus
                  on intuitive design and user experience.
                </p>
                <div className="task-progress progress-blue"></div>
                <div className="task-footer">
                  <span className="task-dates">Oct - Dec 2024</span>
                  <FaUserCircle className="user-icon" />
                </div>
              </div>

              {/* Carte 2 */}
              <div className="task-card">
                <p className="task-category task-pink">Coding</p>
                <h3 className="task-title">Develop Core Application Modules</h3>
                <p className="task-description">
                  Write and test code for the main functionalities of the
                  project. Ensure clean, efficient, and maintainable code.
                </p>
                <div className="task-progress progress-pink"></div>
                <div className="task-footer">
                  <span className="task-dates">Oct - Dec 2024</span>
                  <FaUserCircle className="user-icon" />
                </div>
              </div>

              {/* Carte 3 */}
              <div className="task-card">
                <p className="task-category task-orange">Presentation / GL</p>
                <h3 className="task-title">
                  Prepare Group Presentation on Software Engineering
                </h3>
                <p className="task-description">
                  Work on the structure, slides, and delivery of the group
                  presentation. Focus on teamwork and clear communication.
                </p>
                <div className="task-progress progress-orange"></div>
                <div className="task-footer">
                  <span className="task-dates">Oct - Dec 2024</span>
                  <FaUserCircle className="user-icon" />
                </div>
              </div>

              {/* Carte 4 */}
              <div className="task-card">
                <p className="task-category task-blue">PFE</p>
                <h3 className="task-title">Find a Company for Internship</h3>
                <p className="task-description">
                  Research and contact potential companies for an internship
                  related to the final year project. Focus on gaining relevant
                  experience.
                </p>
                <div className="task-progress progress-blue"></div>
                <div className="task-footer">
                  <span className="task-dates">Oct - Dec 2024</span>
                  <FaUserCircle className="user-icon" />
                </div>
              </div>

              {/* Carte 5 */}
              <div className="task-card">
                <p className="task-category task-yellow">SAD</p>
                <h3 className="task-title">Document Project Requirements</h3>
                <p className="task-description">
                  Analyze the system requirements and create detailed project
                  documentation to ensure all needs are met.
                </p>
                <div className="task-progress progress-yellow"></div>
                <div className="task-footer">
                  <span className="task-dates">Oct - Dec 2024</span>
                  <FaUserCircle className="user-icon" />
                </div>
              </div>
              {/* Carte 6 */}
              <div className="task-card">
                <p className="task-category task-blue">Préparation Test</p>
                <h3 className="task-title">
                  Study for Upcoming Semester Exams
                </h3>
                <p className="task-description">
                  Review all relevant materials and practice problem-solving for
                  the next exams. Organize study sessions if needed
                </p>
                <div className="task-progress progress-blue"></div>
                <div className="task-footer">
                  <span className="task-dates">Oct - Dec 2024</span>
                  <FaUserCircle className="user-icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage2;
