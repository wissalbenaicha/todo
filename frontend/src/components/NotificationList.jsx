import React, { useState } from "react";
import "../styles/NotificationList.css"; // Assure-toi d'importer le fichier CSS

const NotificationList = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Simuler les données de notifications
  const notifications = [
    { id: 1, title: "Reminder", description: "Submit project report", time: "08:15" },
    { id: 2, title: "Task Completed", description: "Grocery shopping marked as done", time: "08:15" },
    { id: 3, title: "Team Meeting", description: "Starts in 15 minutes", time: "08:15" },
    { id: 4, title: "Priority Alert", description: "Fix website bug", time: "08:15" },
  ];

  // Filtrer les notifications si nécessaire
  const filteredNotifications = notifications; // Tu peux ajouter une logique pour le filtre

  return (
    <div className="notification-container">
      {/* Onglets de filtre */}
      <div className="filter-tabs">
        <button
          className={activeTab === "all" ? "active" : ""}
          onClick={() => setActiveTab("all")}
        >
          All Notifications
        </button>
        <button
          className={activeTab === "unread" ? "active" : ""}
          onClick={() => setActiveTab("unread")}
        >
          Unread
        </button>
      </div>

      {/* Liste des notifications */}
      {filteredNotifications.map((notif) => (
        <div key={notif.id} className="notification-item">
          <div className="notification-header">
            <h4>{notif.title}</h4>
            <span className="time">{notif.time}</span>
          </div>
          <p>{notif.description}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;
