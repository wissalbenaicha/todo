// EditTask.jsx
import React, { useState, useContext, useEffect } from "react";
import "../styles/Addtask.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from 'react-router-dom';
import TaskContext from '../context/TaskContext';

const EditTask = () => {
  const { tasks, editTask } = useContext(TaskContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const taskToEdit = tasks.find(task => task.id === parseInt(id));

  const [title, setTitle] = useState(taskToEdit ? taskToEdit.title : "");
  const [selectedDate, setSelectedDate] = useState(taskToEdit ? new Date(taskToEdit.date_echeance) : new Date());
  const [priority, setPriority] = useState(taskToEdit ? taskToEdit.priority : "");
  const [category, setCategory] = useState(taskToEdit ? taskToEdit.category : "");
  const [status, setStatus] = useState(taskToEdit ? taskToEdit.status : "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !priority || !status) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    const updatedTask = {
      id: taskToEdit.id,
      title: title,
      date_echeance: selectedDate.toISOString().split("T")[0],
      priority: priority,
      status: status,
      category: category,
      date_creation: taskToEdit.date_creation
    };

    try {
      editTask(updatedTask);
      alert("Tâche modifiée avec succès !");
      navigate('/tasks');
    } catch (error) {
      console.error("Erreur lors de la modification de la tâche :", error.message);
      alert("Erreur lors de la modification de la tâche.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <h2 className="add-task-title">Modifier la Tâche</h2>

      <div className="form-group">
        <label>Nom de la Tâche :</label>
        <input
          type="text"
          placeholder="Entrez le nom de la tâche"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Date d'Échéance :</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
          className="date-picker-input"
        />
      </div>

      <div className="form-group">
        <label>Priorité :</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="" disabled>
            Choisir une priorité
          </option>
          <option value="High">Haute</option>
          <option value="Medium">Moyenne</option>
          <option value="Low">Basse</option>
        </select>
      </div>

      <div className="form-group">
        <label>Catégorie :</label>
        <input
          type="text"
          placeholder="Entrez le nom de la catégorie"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>État :</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="" disabled>
            Choisir un état
          </option>
          <option value="Pending">En attente</option>
          <option value="In Progress">En cours</option>
          <option value="Completed">Terminée</option>
        </select>
      </div>

      <button type="submit" className="add-task-button">
        Modifier
      </button>
    </form>
  );
};

export default EditTask;
