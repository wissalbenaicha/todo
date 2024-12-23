import React, { useState, useEffect } from "react";
import "../styles/TaskPage.css";
import logo from "../assets/images/logo.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Configurer l'instance Axios avec l'authentification JWT
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Remplacez par l'URL correcte de votre API
});

// Ajouter un intercepteur pour inclure le token dans les en-têtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = 'Bearer ${token}';
  }
  return config;
});

function TaskPage() {
  const [taskName, setTaskName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState(""); // Nom de la catégorie entrée
  const [etat, setEtat] = useState(""); // État de la tâche
  const [newCategory, setNewCategory] = useState(""); // Nom de la nouvelle catégorie
  const [error, setError] = useState(""); // Gestion des erreurs
  const navigate = useNavigate();

  // Fonction pour ajouter une tâche
  const handleContinue = async () => {
    let categoryId = null; // Initialiser categoryId

    // Si une nouvelle catégorie est fournie, l'ajouter à la base de données
    if (newCategory) {
      if (!newCategory.trim()) {
        alert("Veuillez entrer un nom valide pour la nouvelle catégorie.");
        return;
      }

      try {
        // Vérifier si la catégorie existe déjà
        const response = await api.get("task-category/", {
          params: { name: newCategory.trim() },
        });

        // Si la catégorie existe, récupérer son ID
        if (response.data && response.data.length > 0) {
          categoryId = response.data[0].id; // L'ID de la catégorie existante
        } else {
          // Si la catégorie n'existe pas, créer une nouvelle catégorie
          const categoryData = { name: newCategory.trim() };
          const newCategoryResponse = await api.post("task-category/create/", categoryData);

          if (newCategoryResponse.data && newCategoryResponse.data.id) {
            categoryId = newCategoryResponse.data.id; // Mettre à jour avec l'ID de la nouvelle catégorie
            alert("Nouvelle catégorie créée.");
          } else {
            alert("Erreur lors de la création de la catégorie.");
            return;
          }
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de la catégorie:", error.response ? error.response.data : error.message);
        alert("Erreur lors de la création de la catégorie.");
        return;
      }
    }

    // Création de la tâche
    const taskData = {
      nom_tache: taskName,
      date_echeance: selectedDate.toISOString().split("T")[0], // Formatage de la date d'échéance
      priorite: priority,
      etat: etat,
      category: categoryId, // Utilisation de l'ID de la catégorie
      date_creation: new Date().toISOString(), // Date de création au format ISO
    };
    try {
      const response = await api.post("task-entry/", taskData); // Ajouter la tâche dans la table taskentry
      alert("Tâche créée avec succès !");
      navigate("/dashboard"); // Redirection vers une page de tableau de bord

      console.log("Task created:", response.data);
      // Réinitialisation des champs après soumission
      setTaskName("");
      setPriority("");
      setEtat("");
      setCategory("");
      setNewCategory(""); // Réinitialisation de la nouvelle catégorie
      setSelectedDate(new Date());
    } catch (error) {
      console.error("Erreur lors de la création de la tâche:", error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        alert("Erreur : Vous n'êtes pas authentifié. Veuillez vous connecter.");
      } else {
        setError("Erreur lors de la création de la tâche.");
      }
    }
  };
  return (
    <div className="container">
      <div className="task-wrapper">
        <div className="task-left">
          <img src={logo} alt="Logo" className="logoo" />
          <h1 className="task-title">Add your first task</h1>
          <div className="input-wrapper">
            <label>Task Name</label>
            <input
              type="text"
              placeholder="Task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />

            <label>Date échéance</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="date-picker-input"
            />

            <label>Priorité</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="" disabled>Choose priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <label>Catégorie (nouvelle ou existante)</label>
            <input
              type="text"
              placeholder="Enter category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />

            <label>État</label>
            <select value={etat} onChange={(e) => setEtat(e.target.value)}>
              <option value="" disabled>Choose status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}
          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
          <div className="back-arrow">&#8592;</div>
        </div>

        <div className="task-right">
          <p className="user-message">
            <strong>Hello User,</strong><br />
            It’s time to add your first task.
          </p>
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;