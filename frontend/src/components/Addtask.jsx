// AddTask.jsx
import React, { useState, useContext } from "react";
import "../styles/Addtask.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import TaskContext from '../context/TaskContext';

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !priority || !status) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    const taskData = {
      title: title,
      date_echeance: selectedDate.toISOString().split("T")[0], 
      priority: priority,
      status: status,
      category: category || null,
      date_creation: new Date().toISOString(),
      id: Date.now()
    };

    try {
      console.log('Submitting task:', taskData); // Vérifiez ici
      addTask(taskData);
      alert("Tâche créée avec succès !");
      resetForm();
      navigate('/TachePage2'); // Redirigez vers TachePage2
    } catch (error) {
      console.error("Erreur lors de la création de la tâche :", error.message);
      alert("Erreur lors de la création de la tâche.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setSelectedDate(new Date());
    setPriority("");
    setCategory("");
    setStatus("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <h2 className="add-task-title">Ajouter une Tâche</h2>

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
        Ajouter
      </button>
    </form>
  );
};

export default AddTask;
