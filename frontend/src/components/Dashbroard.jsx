import React, { useEffect, useRef, useState } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  LineController, // Ajouter LineController ici
  PointElement, // Ajouter PointElement ici
  PieController,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/Dashboard.css';

// Register necessary chart components
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,      // Enregistrer LineElement
  LineController,   // Enregistrer LineController
  PointElement,     // Enregistrer PointElement
  PieController,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const taskProgressRefs = [useRef(null), useRef(null), useRef(null)];
  const dailyTaskRef = useRef(null);
  const productivityRef = useRef(null);
  const categoryRef = useRef(null);
  const yearlyProgressRef = useRef(null);

  const [timeframe, setTimeframe] = useState('year'); // Track user's selected timeframe

  useEffect(() => {
    const renderChart = (canvasRef, chartType, data, options) => {
      const ctx = canvasRef.current.getContext('2d');
      if (ctx.chartInstance) {
        ctx.chartInstance.destroy();
      }
      ctx.chartInstance = new Chart(ctx, {
        type: chartType,
        data: data,
        options: options,
      });
    };

    // Task Progress Data
    const taskProgressData = [
      { value: 52, color: '#00E5FF' },
      { value: 79, color: '#008A10' },
      { value: 25, color: '#BF1300' },
    ];

    taskProgressRefs.forEach((ref, index) => {
      renderChart(ref, 'doughnut', {
        labels: ['Progress'],
        datasets: [
          {
            data: [taskProgressData[index].value, 100 - taskProgressData[index].value],
            backgroundColor: [taskProgressData[index].color, '#e0e0e0'],
          },
        ],
      }, {
        cutout: '70%',
        plugins: { legend: { display: false } },
      });
    });

    // Daily Task Data - Line Chart
    renderChart(dailyTaskRef, 'bar', {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        {
          label: 'Tasks',
          data: [5, 7, 4, 6, 8],  // Données pour chaque jour de la semaine
          backgroundColor: '#00E5FF', // Couleur cyan
          borderRadius: 80, // Bords arrondis pour les barres
          barThickness: 15,
        },
      ],
    }, {
      plugins: { legend: { display: false } },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 10,  // Ajuster la hauteur maximale des barres si nécessaire
        },
      },
    });
    

    // Productivity Data
    renderChart(productivityRef, 'bar', {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Design',
          data: [3, 4, 2, 5, 3, 0, 0],
          backgroundColor: '#00E5FF',
        },
        {
          label: 'Sport',
          data: [0, 0, 2, 3, 4, 6, 7],
          backgroundColor: '#BF1300',
        },
        {
          label: 'Web Dev',
          data: [2, 3, 4, 2, 3, 0, 0],
          backgroundColor: '#00B0DC',
        },
      ],
    }, {
      plugins: { legend: { position: 'bottom' } },
      indexAxis: 'y',
    });

    // Category Data
    renderChart(categoryRef, 'doughnut', {
      labels: ['Sport', 'Design', 'Web Dev'],
      datasets: [
        {
          data: [25, 50, 25],
          backgroundColor: [
            '#BF1300',
            '#00E5FF',
            '#00B0DC',
          ],
        },
      ],
    }, {
      plugins: { legend: { position: 'bottom' } },
    });

    // Yearly Progress Data
    const getYearlyData = () => ({
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Progress',
          data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          backgroundColor: Array(12).fill('#00B0DC'),
        },
      ],
    });

    const getMonthlyData = () => ({
      labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
      datasets: [
        {
          label: 'Progress',
          data: Array.from({ length: 30 }, () => Math.floor(Math.random() * 50) + 10),
          backgroundColor: Array(30).fill('rgba(58, 134, 255, 0.8)'),
        },
      ],
    });

    const getWeeklyData = () => ({
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Progress',
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 5),
          backgroundColor: Array(7).fill('rgba(58, 134, 255, 0.8)'),
        },
      ],
    });

    const dataMap = {
      year: getYearlyData(),
      month: getMonthlyData(),
      week: getWeeklyData(),
    };

    renderChart(yearlyProgressRef, 'bar', dataMap[timeframe], {
      plugins: { legend: { display: false } },
    });
  }, [timeframe]); // Re-run when timeframe selection changes

  return (
    <div className="dashboard-container">
      <div className="stats-container">
        {/* Task Progress and Daily Task (1st span) */}
        <div className="task-progress">
          <h3>Task Progress</h3>
          <div className="progress-items">
            {['In Progress', 'Completed', 'Not Started'].map((label, index) => (
              <div key={label} className="progress-item">
                <canvas ref={taskProgressRefs[index]}></canvas>
                <p>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="daily-task">
          <h3>Daily Task</h3>
          <canvas ref={dailyTaskRef}></canvas>
        </div>

        {/* Category and Productivity (2nd span) */}
        <div className="category">
          <h3>Category</h3>
          <canvas ref={categoryRef}></canvas>
        </div>

        <div className="productivity">
          <h3>Productivity</h3>
          <canvas ref={productivityRef}></canvas>
        </div>

        {/* Yearly Progress (3rd span) */}
        <div className="yearly-progress">
          <h3>
            Progress
            <br /> {/* Saut de ligne ici */}
            <select onChange={(e) => setTimeframe(e.target.value)} aria-label="Select Timeframe">
              <option value="year">Year</option>
              <option value="month">Month</option>
              <option value="week">Week</option>
            </select>
          </h3>
          <canvas ref={yearlyProgressRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
