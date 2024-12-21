// TasksPage2.jsx
import React, { useContext, useState } from "react";
import Header from '../components/Header'; 
import Sidbar from '../components/Sidbar';
import "../styles/TaskPage2.css";
import { useNavigate } from 'react-router-dom';
import TaskContext from '../context/TaskContext'; 

const TasksPage2 = () => {
  const { tasks, deleteTask } = useContext(TaskContext); 
  const navigate = useNavigate();
  const [editTaskId, setEditTaskId] = useState(null);

  const handleEdit = (task) => {
    setEditTaskId(task.id);
    navigate(`/edit-task/${task.id}`);
  };

  const addTask = () => {
    navigate('/add-task');
  };

  return (
    <div className="tasks-page">
      <Sidbar />
      <div className="main">
        <Header />
        <div className="tasks-header">
          <h2>My Tasks</h2>
          <button className="add-task-btn" onClick={addTask}>
            + Add new task
          </button>
        </div>

        <div className="tasks-container">
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="task-card">
                <div className="task-category">{task.category}</div>
                <h3 className="task-title">{task.title}</h3>

                <div className="task-footer">
                  <span className="task-priority">Priority: {task.priority}</span>
                  <span className={`task-status status-${task.status ? task.status.replace(" ", "-").toLowerCase() : 'unknown'}`}>
                    Status: {task.status || 'Unknown'}
                  </span>
                  <button onClick={() => handleEdit(task)}>Modifier</button>
                  <button onClick={() => deleteTask(task.id)}>Supprimer</button>
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
