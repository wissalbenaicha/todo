import React, { useState, useEffect } from "react";
import Header from '../components/Header'; // Importer le Header
import Sidbar from '../components/Sidbar';
import "../styles/TaskPage2.css";
import { useNavigate } from 'react-router-dom';

const TasksPage2 = () => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Simulation de récupération des tâches depuis une API
  useEffect(() => {
    // Remplacer par une requête API pour récupérer les tâches
    const fetchTasks = async () => {
      const response = await fetch('/api/tasks'); // Remplacer par l'URL de ton API
      const data = await response.json();
      setTasks(data);
    };

    // Remplacer par une requête API pour récupérer les catégories
    const fetchCategories = async () => {
      const response = await fetch('/api/categories'); // Remplacer par l'URL de ton API
      const data = await response.json();
      setCategories(data);
    };

    fetchTasks();
    fetchCategories();
  }, []);

  const addTask = () => {
    navigate('/add-task'); // Redirige vers la page d'ajout de tâche
  };

  return (
    <div className="tasks-page">
      <Sidbar />
      <div className="main">
        <Header />
        <div className="tasks-header">
          <h2>My Tasks</h2>
        </div>
        <button className="add-task-btn" onClick={addTask}>
          + Add new task
        </button>
        <div className="tasks-container">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-category">
                  {/* Affichage de la catégorie, avec une gestion plus flexible */}
                  {categories.find(cat => cat.id === task.categoryId)?.name || "Unknown Category"}
                </div>
                <h3 className="task-title">{task.title}</h3>
                <p className="task-description">{task.description}</p>
                <div className="task-footer">
                  <span className="task-priority">Priority: {task.priority}</span>
                  <span className={`task-status status-${task.status.replace(" ", "-").toLowerCase()}`}>
                    Status: {task.status}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>No tasks available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TasksPage2;
