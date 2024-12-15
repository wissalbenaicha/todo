import React, { useState } from "react";
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

function TaskPage() {
  const [priority, setPriority] = useState("Medium"); // Définir "Medium" comme priorité par défaut
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); // Gérer la visibilité du calendrier
  const [showPriority, setShowPriority] = useState(false); // Gérer la visibilité de la priorité
  const [showCategory, setShowCategory] = useState(false); // Nouvelle variable pour la catégorie
  const [category, setCategory] = useState("uncategorized"); // Nouveau champ de catégorie

  const handleContinue = async () => {
    const taskName = document.querySelector('input[type="text"]').value;

    const response = await fetch("/api/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nom_task: taskName,
        priorite: priority,
        due_date: selectedDate,
        catégorie: category, // Ajout de la catégorie
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert(
        `Task "${taskName}" with priority "${priority}", date "${selectedDate.toLocaleDateString()}", and category "${category}" added successfully!`
      );
    } else {
      alert(`Error: ${data.error}`);
    }
  };

  return (
    <div className="container">
      <div className="task-wrapper">
        {/* Left Section */}
        <div className="task-left">
          <img src={logo} alt="Logo" className="logo" />

          <h1 className="task-title">Add your first task</h1>
          <div className="input-wrapper">
            <input type="text" placeholder="Task name" />
            <div className="icons">
              {/* Icon for Calendar */}
              <span
                className="icon"
                onClick={() => setShowCalendar(!showCalendar)}
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

              {/* Icon for Priority */}
              <span
                className="icon"
                onClick={() => setShowPriority(!showPriority)}
              >
                <FontAwesomeIcon icon={faList} />
                {showPriority && (
                  <div className="priority-wrapper">
                    <select
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value="" disabled selected>
                        priorité
                      </option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>
                )}
              </span>

              {/* Icon for Category */}
              <span
                className="icon"
                onClick={() => setShowCategory(!showCategory)}
              >
                <FontAwesomeIcon icon={faPencilAlt} />
                {showCategory && (
                  <div className="category-wrapper">
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      <option value="" disabled selected>
                        catégorie
                      </option>
                      <option value="uncategorized">Uncategorized</option>
                      <option value="work">Work</option>
                      <option value="personal">Personal</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                )}
              </span>
            </div>
          </div>
          <button className="continue-btn" onClick={handleContinue}>
            Continue
          </button>
          <div className="back-arrow">&#8592;</div>
        </div>

        {/* Right Section */}
        <div className="task-right">
          <div className="step-badge">étape 2/2</div>
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
