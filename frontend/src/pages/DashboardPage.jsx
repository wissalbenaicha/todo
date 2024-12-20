import React from "react";
import Sidbar from "../components/Sidbar";
import Header from "../components/Header";
import Dashboard from "../components/Dashbroard"; // Correction du nom du composant
import "../styles/DashboardPage.css";

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <Sidbar />

      {/* Contenu principal */}
      <div className="main-content">
        {/* Header avec gestion du profil */}
        <Header />

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <Dashboard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
