import React, { useState, useContext } from "react";
import "../styles/Addtask.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import TaskContext from '../context/TaskContext';
import axios from 'axios';

// Configure Axios instance and add interceptor
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://127.0.0.1:8000/api/", // Utilise l'URL de base de ton API
});

// Ajouter un intercepteur pour ajouter le token d'autorisation si disponible
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // Récupère le token depuis le localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Ajoute le token dans l'en-tête de la requête
  }
  return config;
});

const AddTask = () => {
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [categoryId, setCategoryId] = useState("");  // ID de la catégorie
  const [categoryName, setCategoryName] = useState(""); // Nom de la catégorie
  const [status, setStatus] = useState("");
  const { addTask } = useContext(TaskContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !priority || !status) {
      alert("Veuillez remplir tous les champs obligatoires !");
      return;
    }

    let categoryIdToUse = categoryId;  // ID de la catégorie initialement vide
// Vérifier que la catégorie existe déjà ou en créer une nouvelle
if (categoryName && !categoryId) {
  try {
    const response = await api.get("task-category/", {
      params: { name: categoryName.trim() } // Recherche de la catégorie par son nom
    });

    if (response.data && response.data.length > 0) {
      categoryIdToUse = response.data[0].id;  // L'ID de la catégorie existante
    } else {
      // Créer une nouvelle catégorie
      const newCategoryResponse = await api.post("task-category/create/", { name: categoryName.trim() });

      // Vérifier la réponse de l'API
      if (newCategoryResponse.data && newCategoryResponse.data.id) {
        categoryIdToUse = newCategoryResponse.data.id; // Mettre à jour avec l'ID de la nouvelle catégorie
      } else {
        console.error("Erreur de création de catégorie", newCategoryResponse.data);
        alert("Erreur lors de la création de la catégorie.");
        return;
      }
    }
  } catch (error) {
    console.error("Erreur lors de la vérification ou création de la catégorie :", error.response ? error.response.data : error.message);
    alert("Erreur lors de la vérification ou de la création de la catégorie.");
    return;
  }
}


    // Préparer les données de la tâche
    const taskData = {
      nom_tache: title,
      date_echeance: selectedDate.toISOString().split("T")[0], // Format date en YYYY-MM-DD
      priorite: priority,
      etat: status,
      category: categoryIdToUse,  // Utilisation de l'ID de la catégorie (existante ou nouvellement créée)
      date_creation: new Date().toISOString(),
    };

    // Envoyer les données de la tâche à l'API
    try {
      const response = await api.post("task-entry/", taskData); // Requête POST pour créer une tâche
      alert("Tâche créée avec succès !");
      addTask(response.data); // Ajouter la tâche au contexte global
      resetForm();
      navigate('/TachePage2');  // Rediriger vers la page des tâches
    } catch (error) {
      console.error("Erreur lors de la création de la tâche :", error.message);
      alert("Erreur lors de la création de la tâche.");
    }
  };

  const resetForm = () => {
    setTitle("");
    setSelectedDate(new Date());
    setPriority("");
    setCategoryId("");  // Réinitialisation de l'ID de la catégorie
    setCategoryName(""); // Réinitialisation du nom de la catégorie
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
          value={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value);
            setCategoryId("");  // Réinitialise l'ID si le nom est modifié
          }}
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
