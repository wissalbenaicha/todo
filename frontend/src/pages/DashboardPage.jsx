import React from "react";
import Sidbar from "../components/Sidbar";
import Header from "../components/Header";
import Dashbroard from "../components/Dashbroard"
import "../styles/DashboardPage.css"; // Ajoutez du CSS pour organiser la mise en page

const DashboardPage = () => {
  return (
    <div className="page-container">
      {/* Sidebar */}
      <Sidbar />

      {/* Contenu principal */}
      <div className="main-content">
        {/* Header avec gestion du profil */}
        <Header  />

 {/* Dashboard Content */}
 <div className="dashboard-content">
          <Dashbroard />
        </div>
        
        
    </div>
    
      </div>
  );
};

export default DashboardPage;
