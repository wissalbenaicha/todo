import React, { useEffect, useRef } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  PieController,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import '../styles/Dashboard.css';

// Enregistrer les composants nécessaires
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
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

  useEffect(() => {
    // Fonction pour initialiser un graphique
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

    // Task Progress
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

    // Daily Task
    renderChart(dailyTaskRef, 'bar', {
      labels: ['M', 'T', 'W', 'T', 'F'],
      datasets: [
        {
          label: 'Tasks',
          data: [5, 8, 6, 9, 7],
          backgroundColor: 'rgba(58, 134, 255, 0.8)',
        },
      ],
    }, {
      plugins: { legend: { display: false } },
    });

    // Productivity
    renderChart(productivityRef, 'bar', {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Design',
          data: [3, 4, 2, 5, 3, 0, 0],
          backgroundColor: 'rgba(58, 134, 255, 0.8)',
        },
        {
          label: 'Sport',
          data: [0, 0, 2, 3, 4, 6, 7],
          backgroundColor: 'rgba(244, 67, 54, 0.8)',
        },
        {
          label: 'Web Dev',
          data: [2, 3, 4, 2, 3, 0, 0],
          backgroundColor: 'rgba(76, 175, 80, 0.8)',
        },
      ],
    }, {
      plugins: { legend: { position: 'bottom' } },
      indexAxis: 'y',
    });

    // Category
    renderChart(categoryRef, 'doughnut', {
      labels: ['Sport', 'Design', 'Web Dev'],
      datasets: [
        {
          data: [25, 50, 25],
          backgroundColor: [
            'rgba(244, 67, 54, 0.8)',
            'rgba(58, 134, 255, 0.8)',
            'rgba(76, 175, 80, 0.8)',
          ],
        },
      ],
    }, {
      plugins: { legend: { position: 'bottom' } },
    });

    // Yearly Progress
    renderChart(yearlyProgressRef, 'bar', {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Progress',
          data: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
          backgroundColor: Array(12).fill('rgba(58, 134, 255, 0.8)'),
        },
      ],
    }, {
      plugins: { legend: { display: false } },
    });
  }, []);

  return (
    <div className="dashboard-container">
      <div className="header">
        <h1>Dashbroad</h1>
        <input type="text" placeholder="Search..." />
      </div>

      <div className="stats-container">
        {/* Task Progress */}
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

        {/* Daily Task */}
        <div className="daily-task">
          <h3>Daily Task</h3>
          <canvas ref={dailyTaskRef}></canvas>
        </div>

        {/* Productivity */}
        <div className="productivity">
          <h3>Productivity</h3>
          <canvas ref={productivityRef}></canvas>
        </div>

        {/* Category */}
        <div className="category">
          <h3>Category</h3>
          <canvas ref={categoryRef}></canvas>
        </div>

        {/* Yearly Progress */}
        <div className="yearly-progress">
          <h3>Yearly Progress</h3>
          <canvas ref={yearlyProgressRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
