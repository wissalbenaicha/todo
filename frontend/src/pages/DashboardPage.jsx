import React from "react";
import Sidebar from "../components/Sidbar";
import Header from "../components/Header";
import Dashbroard from "../components/Dashbroard"
import "../styles/DashboardPage.css"; // Ajoutez du CSS pour organiser la mise en page

const DashboardPage = () => {
  return (
    <div className="dashboard-page">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <div className="dashboard-content">
          <h1>Welcome to the Dashboard</h1>
          <Dashbroard />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
