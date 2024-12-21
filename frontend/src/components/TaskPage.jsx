import React, { useState, useEffect } from "react";
import "../styles/TaskPage.css";
import logo from "../assets/images/logo.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

// Configurer l'instance Axios avec l'authentification JWT
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/", // Remplacez par l'URL correcte de votre API
});

// Ajouter un intercepteur pour inclure le token dans les en-têtes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

function TaskPage() {
  // États pour la gestion des données
  const [taskName, setTaskName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState(""); // ID de la catégorie
  const [etat, setEtat] = useState(""); // État de la tâche
  const [categories, setCategories] = useState([]); // Liste des catégories disponibles

  // Fonction pour récupérer les catégories depuis l'API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("task-category/"); // Endpoint pour récupérer les catégories
        setCategories(response.data); // Met à jour la liste des catégories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // API Axios instance
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/", // Remplacez par l'URL correcte de votre API
  });

  // Fonction pour ajouter une tâche
  const handleContinue = async () => {
    // Vérification des champs
    if (!taskName || !priority || !etat ) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const taskData = {
      nom_tache: taskName,
      date_echeance: selectedDate.toISOString().split("T")[0], // Formatage de la date d'échéance
      priorite: priority,
      etat: etat,
      category: category, // Envoie l'ID de la catégorie
      date_creation: new Date().toISOString(), // Date de création au format ISO
    };

    try {
      const response = await api.post("task-entry/", taskData);
      alert("Tâche créée avec succès !");
      console.log("Task created:", response.data);
    } catch (error) {
      console.error("Error creating task:", error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        alert("Erreur : Vous n'êtes pas authentifié. Veuillez vous connecter.");
      } else {
        alert("Erreur lors de la création de la tâche.");
      }
    }
  };

  return (
    <div className="container">
      <div className="task-wrapper">
        {/* Section gauche */}
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
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="" disabled>
                Choose priority
              </option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <label>Catégorie</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)} // Modifie l'ID de la catégorie
            >
              <option value="" disabled>
                Choose category
              </option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label>État</label>
            <select
              value={etat}
              onChange={(e) => setEtat(e.target.value)} // Ajout d'un état pour la tâche
            >
              <option value="" disabled>
                Choose status
              </option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
          <div className="back-arrow">&#8592;</div>
        </div>

        {/* Section droite */}
        <div className="task-right">
          <p className="user-message">
            <strong>Hello User,</strong>
            <br />
            It’s time to add your first task.
          </p>
          <div className="circle"></div>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
