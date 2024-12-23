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

// Intercepteur pour gérer le rafraîchissement des tokens
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");
      if (refreshToken) {
        try {
          const response = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            {
              refresh: refreshToken,
            }
          );
          localStorage.setItem("access_token", response.data.access);
          error.config.headers.Authorization = `Bearer ${response.data.access}`;
          return axios(error.config); // Relancer la requête avec le nouveau token
        } catch (refreshError) {
          alert("Votre session a expiré. Veuillez vous reconnecter.");
          localStorage.clear();
          window.location.href = "/login";
        }
      } else {
        alert("Session expirée. Veuillez vous reconnecter.");
        localStorage.clear();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

function TaskPage() {
  const [taskName, setTaskName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState(""); // ID de la catégorie sélectionnée
  const [etat, setEtat] = useState(""); // État de la tâche
  const [newCategory, setNewCategory] = useState(""); // Nom de la nouvelle catégorie
  const [categories, setCategories] = useState([]); // Liste des catégories disponibles
  const [error, setError] = useState(""); // Gestion des erreurs
  const [loading, setLoading] = useState(false); // Gestion du chargement

  // Récupérer les catégories existantes lors du montage du composant
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("task-category/");
        setCategories(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
        setError("Erreur lors de la récupération des catégories.");
      }
    };
    fetchCategories();
  }, []);

  // Fonction pour ajouter une tâche
  const handleContinue = async () => {
    setError(""); // Réinitialiser les erreurs à chaque tentative
    let categoryId = category;
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("Vous n'êtes pas authentifié. Veuillez vous connecter.");
      window.location.href = "/login";
      return;
    }

    // Vérification si la catégorie existe déjà
    if (newCategory.trim() && !categories.some(cat => cat.name === newCategory.trim())) {
      try {
        const categoryData = { name: newCategory.trim() };

        // Ajoutez l'en-tête d'authentification avec le token d'accès
        const response = await api.post("task-category/create/", categoryData, {
          headers: {
            Authorization: `Bearer ${token}`, // Inclure le token ici
          },
        });

        categoryId = response.data.id;
        setCategory(categoryId); // Mettre à jour l'ID de la catégorie dans l'état
        setCategories([...categories, response.data]); // Ajouter la nouvelle catégorie à la liste
      } catch (error) {
        console.error("Erreur lors de l'ajout de la catégorie:", error.response ? error.response.data : error.message);
        alert("Erreur lors de la création de la catégorie.");
        return;
      }
    } else if (newCategory.trim() && categories.some(cat => cat.name === newCategory.trim())) {
      setError("Cette catégorie existe déjà.");
      return;
    }

    // Vérification des champs
    if (!taskName.trim() || !priority || !etat || !categoryId) {
      setError("Tous les champs doivent être remplis.");
      return;
    }

    const taskData = {
      nom_tache: taskName,
      date_echeance: selectedDate.toISOString().split("T")[0],
      priorite: priority,
      etat: etat,
      category: categoryId,
      date_creation: new Date().toISOString(),
    };

    setLoading(true); // Démarrer le chargement

    try {
      const response = await api.post("task-entry/", taskData);
      alert("Tâche créée avec succès !");
      console.log("Task created:", response.data);
      // Réinitialiser les champs
      setTaskName("");
      setPriority("");
      setEtat("");
      setCategory("");
      setNewCategory("");
      setSelectedDate(new Date());
    } catch (error) {
      console.error("Erreur lors de la création de la tâche:", error);
      if (error.response && error.response.status === 401) {
        alert("Erreur : Vous n'êtes pas authentifié. Veuillez vous connecter.");
      } else {
        setError("Erreur lors de la création de la tâche.");
      }
    } finally {
      setLoading(false); // Arrêter le chargement
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
              onChange={(e) => setCategory(e.target.value)}
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

            <label>Nouvelle catégorie</label>
            <input
              type="text"
              placeholder="Enter new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />

            <label>État</label>
            <select value={etat} onChange={(e) => setEtat(e.target.value)}>
              <option value="" disabled>
                Choose status
              </option>
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
