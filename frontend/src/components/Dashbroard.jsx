import React, { useEffect, useRef, useState } from 'react';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  LineController,
  PointElement,
  PieController,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

import '../styles/Dashboard.css';

// Register necessary chart components
Chart.register(
  ChartDataLabels,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  LineController,
  PointElement,
  PieController,
  DoughnutController,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  // Refs for each chart
  const taskProgressRefs = [useRef(null), useRef(null), useRef(null)];
  const dailyTaskRef = useRef(null);
  const productivityRef = useRef(null);
  const categoryRef = useRef(null);
  const yearlyProgressRef = useRef(null);

  // States for task completion and remaining tasks
  const [tasksCompleted, setTasksCompleted] = useState(50);
  const [tasksRemaining, setTasksRemaining] = useState(30);
  const totalTasks = tasksCompleted + tasksRemaining;
  const [timeframe, setTimeframe] = useState('year'); // Track user's selected timeframe

  // Function to calculate percentage of task completion
  const getCompletionPercentage = (completed, total) => (completed / total) * 100;

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
        plugins: {
          legend: { display: false },
          datalabels: {
            color: 'black',
            font: {
              weight: 'bold',
              size: 18,
            },
           formatter: (value) => `${Math.round(value)}%`,
            anchor: 'end',       // Positionner l'étiquette à la fin
           align: 'start',      // Alignement de l'étiquette à l'extérieur
           offset: 20,          // Décalage pour éloigner l'étiquette de l'anneau
           rotation: 0,         // Rotation si nécessaire
}
        },
      });
    });

    // Daily Task Data - Line Chart
    renderChart(dailyTaskRef, 'bar', {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        {
          label: 'Tasks',
          data: [5, 7, 4, 6, 8],
          backgroundColor: '#00E5FF',
          borderRadius: 80,
          barThickness: 15,
        },
      ],
    }, {
      plugins: { legend: { display: false } },
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
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
      plugins: { legend: { position: 'bottom' },
      datalabels: {
        display: false, // Désactive les labels affichés sur les barres
      }, },
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1.5,
      layout: {
        padding: 20,
      },
      
    });

    // Category Data
    renderChart(categoryRef, 'doughnut', {
      labels: ['Sport', 'Design', 'Web Dev'],
      datasets: [
        {
          data: [25, 50, 25],
          backgroundColor: [
            '#BF1300',
            '#00B0DC',
            '#00E5FF',
          ],
        },
      ],
    }, {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          font: {
            size: 18, // Taille des datalabels
            weight: 'bold',
          },
          color: 'black', // Couleur des datalabels (facultatif)
        },
        legend: { position: 'bottom' },
      },
      aspectRatio: 1,
      layout: {
        padding: 20,
      },
      
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
          backgroundColor: Array(30).fill('#00B0DC'),
        },
      ],
    });

    const getWeeklyData = () => ({
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Progress',
          data: Array.from({ length: 7 }, () => Math.floor(Math.random() * 20) + 5),
          backgroundColor: Array(7).fill('#00B0DC'),
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
  }, [timeframe]);

  return (
    <div className="dashboard-container">
      <div className="stats-container">
        <div className="task-bar">
          <div className="task-bar-complete">
            <div 
              className="task-progress" 
              style={{ width: `${getCompletionPercentage(tasksCompleted, totalTasks)}%`, backgroundColor: '#00B0DC' }}
            />
            <div className="task-label">
              {tasksCompleted} / {totalTasks} Tâches Complètes
            </div>
          </div>
        </div>

        <div className="task-bar">
          <div className="task-bar-remaining">
            <div 
              className="task-progress" 
              style={{ width: `${getCompletionPercentage(tasksRemaining, totalTasks)}%`, backgroundColor: '#BF1300' }}
            />
            <div className="task-label">
              {tasksRemaining} / {totalTasks} Tâches Restantes
            </div>
          </div>
        </div>

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
            <br />
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
