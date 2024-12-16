import React from "react";
import Sidbar from "../components/Sidbar";
import Header from "../components/Header";
import Dashbroard from "../components/Dashbroard"
import "../styles/DashboardPage.css"; // Ajoutez du CSS pour organiser la mise en page

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      {/* Sidbar */}
      <Sidbar />

      {/* Main Content */}
     
        {/* Dashboard Content */}
        <div className="dashboard-content">
          <h1>Welcome to the Dashboard</h1>
          <Dashbroard />
        </div>
      </div>
  );
};

export default DashboardPage;
