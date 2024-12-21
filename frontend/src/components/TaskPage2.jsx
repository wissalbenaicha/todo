import React, { useState } from "react";
import Header from '../components/Header'; // Importer le Header
import Sidbar from '../components/Sidbar';
import "../styles/TaskPage2.css";

const TasksPage2 = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      category: "Design",
      title: "Create User Interface for New Project",
      description:
        "Develop wireframes and mockups for the upcoming project. Focus on intuitive design and user experience.",
      priority: "Moderate",
      status: "In progress",
    },
    {
      id: 2,
      category: "Coding",
      title: "Develop Core Application Modules",
      description:
        "Write and test code for the main functionalities of the project. Ensure clean, efficient, and maintainable code.",
      priority: "Moderate",
      status: "Completed",
    },
    {
      id: 3,
      category: "Presentation / GL",
      title: "Prepare Group Presentation on Software Engineering",
      description:
        "Work on the structure, slides, and delivery of the group presentation. Focus on teamwork and clear communication.",
      priority: "Moderate",
      status: "In progress",
    },
  ]);

  const addTask = () => {
    // Redirection vers la page pour ajouter une tâche
    alert("Redirect to add task page");
  };

  return (
    <div className="tasks-page">
      <Sidbar/>
      <div className="main">
        <Header />
        <div className="tasks-header">
          <h2>My Tasks</h2>
          
        </div>
        <button className="add-task-btn" onClick={addTask}>
            + Add new task
          </button>
        <div className="tasks-container">
          {tasks.map((task) => (
            <div key={task.id} className="task-card">
              <div className="task-category">{task.category}</div>
              <h3 className="task-title">{task.title}</h3>
              <p className="task-description">{task.description}</p>
              <div className="task-footer">
                <span className="task-priority">Priority: {task.priority}</span>
                <span className={`task-status status-${task.status.replace(" ", "-").toLowerCase()}`}>
                  Status: {task.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TasksPage2;
