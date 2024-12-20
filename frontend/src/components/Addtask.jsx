import React, { useState } from 'react';
import '../styles/Addtask.css'; // Import du fichier CSS

const AddTask = ({ onAddTask }) => {
  const [formData, setFormData] = useState({
    taskName: '',
    priority: 'Moyenne',
    date: '',
    category: '',
    status: 'En attente',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.taskName || !formData.date || !formData.category) {
      alert('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    onAddTask(formData); // Transmet les données de la tâche au composant parent
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      taskName: '',
      priority: 'Moyenne',
      date: '',
      category: '',
      status: 'En attente',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <h2 className="add-task-title">Ajouter une Tâche</h2>

      <div className="form-group">
        <label>Nom de la Tâche :</label>
        <input
          type="text"
          name="taskName"
          value={formData.taskName}
          onChange={handleChange}
          placeholder="Entrez le nom de la tâche"
          required
        />
      </div>

      <div className="form-group">
        <label>Priorité :</label>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="Basse">Basse</option>
          <option value="Moyenne">Moyenne</option>
          <option value="Haute">Haute</option>
        </select>
      </div>

      <div className="form-group">
        <label>Date :</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Catégorie :</label>
        <input
          type="text"
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Entrez la catégorie"
          required
        />
      </div>

      <div className="form-group">
        <label>État :</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="En attente">En attente</option>
          <option value="En cours">En cours</option>
          <option value="Terminée">Terminée</option>
        </select>
      </div>

      <button type="submit" className="add-task-button">Ajouter</button>
    </form>
  );
};

export default AddTask;
