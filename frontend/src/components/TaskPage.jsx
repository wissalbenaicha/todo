import React, { useState, useEffect, useRef } from "react";
import "../styles/TaskPage.css";
import logo from "../assets/images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faList,
  faCalendarDays,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function TaskPage() {
  // États pour la gestion des données
  const [taskName, setTaskName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [priority, setPriority] = useState("");
  const [category, setCategory] = useState("");
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPriority, setShowPriority] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [etat, setEtat] = useState(""); // État de la tâche

  // Références pour gérer les menus déroulants
  const calendarRef = useRef(null);
  const priorityRef = useRef(null);
  const categoryRef = useRef(null);

  // API Axios instance
  const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
  });

  // Fonction pour ajouter une tâche
  const handleContinue = async () => {
    const taskData = {
      nom_tache: taskName,
      date_echeance: selectedDate.toISOString().split("T")[0],
      priorite: priority,
      etat: etat, // Ajout de l'état
    };

    try {
      const response = await api.post("table1/", taskData);
      alert("Tâche créée avec succès !");
      console.log("Task created:", response.data);
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Erreur lors de la création de la tâche.");
    }
  };

  // Fonction pour récupérer les tâches
  const fetchTasks = async () => {
    try {
      const response = await api.get("table1/");
      console.log("Tasks:", response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // Appeler fetchTasks au chargement du composant
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="container">
      <div className="task-wrapper">
        {/* Left Section */}
        <div className="task-left">
          <img src={logo} alt="Logo" className="logo" />
          <h1 className="task-title">Add your first task</h1>
          <div className="input-wrapper">
            <input
              type="text"
              placeholder="Task name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />

            {/* Date d'échéance */}
            <div className="label">
            <label >Date echeance </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              className="date-picker-input"
            />

            {/* Priorité */}
            <label>Priorite</label>
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

            {/* Etat */}
            <label>Etat</label>
            <select value={etat} onChange={(e) => setEtat(e.target.value)}>
              <option value="" disabled>
                Choose status
              </option>
              <option value="In Progress">In Progress</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          </div>

          {/* <div className="icons">
            <span
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowCalendar(!showCalendar);
              }}
              ref={calendarRef}
            >
              <FontAwesomeIcon icon={faCalendarDays} />
              {showCalendar && (
                <div className="calendar-dropdown">
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    dateFormat="dd/MM/yyyy"
                    className="date-picker-input"
                  />
                </div>
              )}
            </span>

            <span
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowPriority(!showPriority);
              }}
              ref={priorityRef}
            >
              <FontAwesomeIcon icon={faList} />
              {showPriority && (
                <div className="priority-wrapper">
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="" disabled>
                      Priority
                    </option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              )}
            </span>

            <span
              className="icon"
              onClick={(e) => {
                e.stopPropagation();
                setShowCategory(!showCategory);
              }}
              ref={categoryRef}
            >
              <FontAwesomeIcon icon={faPencilAlt} />
              {showCategory && (
                <div className="category-wrapper">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="" disabled>
                      Category
                    </option>
                    <option value="uncategorized">Uncategorized</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="urgent">Urgent</option>
                  </select>
                </div>
              )}
            </span>
          </div>*/}

          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
          <div className="back-arrow">&#8592;</div>
        </div>

        {/* Right Section */}
        <div className="task-right">
          <div className="step-badge">Step 2/2</div>
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
