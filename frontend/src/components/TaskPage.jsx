import React, { useState } from "react";
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

// Gérer les erreurs d'expiration du token et rafraîchir automatiquement
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401 && error.config && !error.config._retry) {
      error.config._retry = true;
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        const response = await axios.post("http://127.0.0.1:8000/api/token/refresh/", {
          refresh: refreshToken,
        });
        localStorage.setItem("access_token", response.data.access);
        error.config.headers.Authorization = `Bearer ${response.data.access}`;
        return api.request(error.config);
      } catch (refreshError) {
        console.error("Refresh token expired. Please log in again.");
        localStorage.clear();
        window.location.href = "/login"; // Redirige vers la page de connexion
      }
    }
    return Promise.reject(error);
  }
);

function TaskPage() {
  // États pour la gestion des données
  const [taskName, setTaskName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState(""); // Nom de la catégorie
  const [etat, setEtat] = useState(""); // État de la tâche

  // Fonction pour ajouter une tâche
  const handleContinue = async () => {
    const taskData = {
      nom_tache: taskName,
      date_echeance: selectedDate.toISOString().split("T")[0],
      priorite: priority,
      etat: etat,
      category: category, // Nom de la catégorie
    };

    try {
      const response = await api.post("task-entry/", taskData);
      alert("Tâche créée avec succès !");
      console.log("Task created:", response.data);
    } catch (error) {
      console.error("Error creating task:", error);
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
            <input
              type="text"
              placeholder="Enter category name"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
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
