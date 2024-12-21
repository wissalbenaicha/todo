import React, { useState } from "react";
import "../styles/Addtask.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

// Configurer l'instance Axios
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Remplacez par l'URL correcte de votre API
});

const AddTask = () => {
  const [taskName, setTaskName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState(""); // Nom de la catégorie
  const [etat, setEtat] = useState(""); // État de la tâche

  // Fonction pour ajouter une tâche
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification des champs obligatoires
    if (!taskName || !priority || !etat) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    const taskData = {
      nom_tache: taskName,
      date_echeance: selectedDate.toISOString().split("T")[0], // Formatage de la date d'échéance
      priorite: priority,
      etat: etat,
      category: category || null, // Nom de la catégorie
      date_creation: new Date().toISOString(), // Date de création au format ISO
    };

    try {
      const response = await api.post("task-entry/", taskData);
      alert("Tâche créée avec succès !");
      console.log("Tâche créée :", response.data);
      resetForm();
    } catch (error) {
      console.error("Erreur lors de la création de la tâche :", error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        alert("Erreur : Vous n'êtes pas authentifié. Veuillez vous connecter.");
      } else {
        alert("Erreur lors de la création de la tâche.");
      }
    }
  };

  // Réinitialiser le formulaire
  const resetForm = () => {
    setTaskName("");
    setSelectedDate(new Date());
    setPriority("");
    setCategory("");
    setEtat("");
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <h2 className="add-task-title">Ajouter une Tâche</h2>

      <div className="form-group">
        <label>Nom de la Tâche :</label>
        <input
          type="text"
          placeholder="Entrez le nom de la tâche"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
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
          value={etat}
          onChange={(e) => setEtat(e.target.value)}
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
