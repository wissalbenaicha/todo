import React from "react";
import TaskPage2 from "../components/TaskPage2";
import Header from "../components/Header"; // Importer le Header
import Sidbar from "../components/Sidbar"; // Importer le Sidebar
import "../styles/TachePage2.css"; // Importer les styles CSS de TachePage2
import "../styles/TaskPage2.css"; 







const TachePage2 = () => {
  return (
    <div className="tache-page-container">
      {/* Sidebar */}
      <Sidbar />

      {/* Contenu principal */}
      <div className="main-content">
        {/* Header */}
        <Header />

        {/* Section principale des tâches */}
        <div className="tasks-content">
          <TaskPage2 />
        </div>
      </div>
    </div>
  );
};

export default TachePage2;