import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";  // Importation du graphique Doughnut
import { Bar } from "react-chartjs-2"; // Importation du graphique Bar
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import '../styles/Dashboard.css'; // Assurez-vous d'importer le fichier CSS

// Enregistrement des éléments nécessaires pour Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const DashboardWithChart = () => {
  // État pour les données du tableau de bord
  const [dashboardData, setDashboardData] = useState({
    tasks_completed: 0,
    tasks_remaining: 0,
    total_tasks: 0,
    tasks_completed_percentage: 0,
    tasks_remaining_percentage: 0,
  });

  // État pour les données des graphiques
  const [chartData, setChartData] = useState(null);
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);

  // Récupération des données du tableau de bord
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/dashboard/tasks/')
      .then((response) => response.json())
      .then((data) => setDashboardData(data))
      .catch((error) => console.error('Erreur lors de la récupération des données du tableau de bord :', error));

    // Récupérer les données des catégories de tâches pour le graphique
    axios
      .get("http://127.0.0.1:8000/api/task-categories/")
      .then((response) => {
        let data = response.data;
        data = data.map((category) => ({
          ...category,
          name: category.name ? category.name : "Autres",
        }));
        const sortedData = data.sort((a, b) => b.count - a.count).slice(0, 6);

        const labels = sortedData.map((category) => category.name);
        const counts = sortedData.map((category) => category.count);

        setChartData({
          labels: labels,
          datasets: [
            {
              label: "Nombre de tâches",
              data: counts,
              backgroundColor: [
                "#BF1300", "#00E5FF", "#00B0DC", "#4BC0C0", "#9966FF", "#001A6E",
              ],
              hoverBackgroundColor: [
                "#BF1300", "#00E5FF", "#00B0DC", "#4BC0C0", "#9966FF", "#001A6E",
              ],
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des catégories :", error);
      });

    // Récupérer les tâches quotidiennes pour le graphique de barres
    axios
      .get("http://localhost:8000/api/daily-tasks/")
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des tâches quotidiennes :", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  // Préparer les données pour le graphique de barres
  const labels = Object.keys(tasks).map((key) => key.replace("day_", "Jour "));
  const dataValues = Object.values(tasks);

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: "Nombre de tâches",
        data: dataValues,
        backgroundColor: "#00E5FF", // Couleur de la barre
        borderColor: "#00E5FF", // Couleur de la bordure
        borderWidth: 2, // Largeur de la bordure
        barThickness: 30, // Taille de la barre (réduite)
        borderRadius: 30, // Bordure arrondie
      },
    ],
  };

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>

      {/* Informations des tâches */}
      <div className="task-info">
        <div>
          <h3>Tâches Complètes</h3>
          <p>{dashboardData.tasks_completed} / {dashboardData.total_tasks}</p>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${dashboardData.tasks_completed_percentage}%`,
                backgroundColor: '#00B0DC',
              }}
            />
          </div>
          <p>Complété : {dashboardData.tasks_completed_percentage}%</p>
        </div>

        <div>
          <h3>Tâches Restantes</h3>
          <p>{dashboardData.tasks_remaining} / {dashboardData.total_tasks}</p>
          <div className="progress-bar-container">
            <div
              className="progress-bar"
              style={{
                width: `${dashboardData.tasks_remaining_percentage}%`,
                backgroundColor: '#BF1300',
              }}
            />
          </div>
          <p>Restant : {dashboardData.tasks_remaining_percentage}%</p>
        </div>
      </div>

      {/* Graphiques */}
      <div className="chart-container">
        <div className="chart-box">
          <h3>Graphique des Catégories de Tâches</h3>
          {chartData ? (
            <Doughnut data={chartData}
                  options={
                    {
                      cutout: '70%', 
                      radius: '60%',  // Réduit la taille du donut en ajustant son rayon

                    }
                  }
            />
            
          ) : (
            <p>Chargement du graphique...</p>
          )}
        </div>

        <div className="chart-box">
          <h3>Graphique des Tâches Quotidiennes</h3>
          <Bar data={barChartData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardWithChart;
