import React, { useEffect, useRef, useState } from "react";
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
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

import "../styles/Dashboard.css";

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

  const [taskProgressData, setTaskProgressData] = useState([]);
  const [dailyTasks, setDailyTasks] = useState([]);
  const [productivityData, setProductivityData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);

  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const totalTasks = tasksCompleted + tasksRemaining;
  const [timeframe, setTimeframe] = useState("year"); // Track user's selected timeframe

  // Function to calculate percentage of task completion
  const getCompletionPercentage = (completed, total) => (total > 0 ? (completed / total) * 100 : 0);

  useEffect(() => {
    // Fetch Task Progress Data
    fetch('/api/tasks/progress')
      .then(response => response.json())
      .then(data => {
        setTaskProgressData(data.category_progress);
        setTasksCompleted(data.tasks_completed); // Supposons que l'API renvoie ces valeurs
        setTasksRemaining(data.tasks_remaining); // Supposons que l'API renvoie ces valeurs
      })
      .catch(error => console.error('Error fetching task progress:', error));

    // Fetch Daily Tasks Data
    fetch('/api/tasks/daily')
      .then(response => response.json())
      .then(data => setDailyTasks(data))
      .catch(error => console.error('Error fetching daily tasks:', error));

    // Fetch Productivity Data
    fetch('/api/tasks/productivity')
      .then(response => response.json())
      .then(data => {
        setProductivityData(data.productivity);
      })
      .catch(error => console.error('Error fetching productivity data:', error));

    // Fetch Category Data
    fetch('/api/task-category')
      .then(response => response.json())
      .then(data => setCategoryData(data))
      .catch(error => console.error('Error fetching category data:', error));

    // Fetch Yearly Progress Data
    fetch(`/api/tasks/user-progress?timeframe=${timeframe}`)
      .then(response => response.json())
      .then(data => setYearlyData(data))
      .catch(error => console.error('Error fetching yearly progress:', error));
  }, [timeframe]);

  useEffect(() => {
    const renderChart = (canvasRef, chartType, data, options) => {
      const ctx = canvasRef.current.getContext("2d");
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
    const progressData = Object.keys(taskProgressData).map(key => ({
      value: taskProgressData[key].progress,
      color: '#00E5FF',
    }));

    taskProgressRefs.forEach((ref, index) => {
      renderChart(ref, 'doughnut', {
        labels: ['Progress'],
        datasets: [
          {
            data: [progressData[index]?.value || 0, 100 - (progressData[index]?.value || 0)],
            backgroundColor: [progressData[index]?.color || '#e0e0e0', '#e0e0e0'],
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
            anchor: 'end',
            align: 'start',
            offset: 20,
            rotation: 0,
          }
        },
      });
    });

    // Daily Task Data - Line Chart
    const dailyLabels = dailyTasks.map(task => task.date_creation);
    const dailyCounts = dailyTasks.map(task => task.count);

    renderChart(dailyTaskRef, 'bar', {
      labels: dailyLabels,
      datasets: [
        {
          label: 'Tasks',
          data: dailyCounts,
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
    const productivityLabels = productivityData.map(log => log.date);
    const categoryDataByCategory = {}; // Grouping productivity by category

    productivityData.forEach(log => {
      if (!categoryDataByCategory[log.category]) {
        categoryDataByCategory[log.category] = [];
      }
      categoryDataByCategory[log.category].push(log.total_hours);
    });

    const categoryColors = {
      Design: '#00E5FF',
      Sport: '#BF1300',
      'Web Dev': '#00B0DC',
    };

    renderChart(productivityRef, 'bar', {
      labels: productivityLabels,
      datasets: Object.keys(categoryDataByCategory).map(category => ({
        label: category,
        data: categoryDataByCategory[category],
        backgroundColor: categoryColors[category] || '#e0e0e0',
      })),
    }, {
      plugins: {
        legend: { position: 'bottom' },
        datalabels: {
          display: false, // Disable datalabels on bars
        },
      },
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 1.5,
      layout: {
        padding: 20,
      },
    });

    // Category Data
    const categoryLabels = categoryData.map(category => category.name);
    const categoryCounts = categoryData.map(category => category.task_entries.length);

    renderChart(categoryRef, 'doughnut', {
      labels: categoryLabels,
      datasets: [
        {
          data: categoryCounts,
          backgroundColor: ['#BF1300', '#00B0DC', '#00E5FF'],
        },
      ],
    }, {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        datalabels: {
          font: { size: 18, weight: 'bold' },
          color: 'black',
        },
        legend: { position: 'bottom' },
      },
      aspectRatio: 1,
      layout: {
        padding: 20,
      },
    });

    // Yearly Progress Data
    renderChart(yearlyProgressRef, 'bar', {
      labels: yearlyData.map(data => data.date),
      datasets: [
        {
          label: 'Progress',
          data: yearlyData.map(data => data.value),
          backgroundColor: Array(yearlyData.length).fill('#00B0DC'),
        },
      ],
    }, {
      plugins: { legend: { display: false } },
    });
  }, [taskProgressData, dailyTasks, productivityData, categoryData, yearlyData, timeframe]);

  return (
    <div className="dashboard-container">
      <div className="stats-container">
        <div className="task-bar">
          <div className="task-bar-complete">
            <div
              className="task-progress"
              style={{
                width: `${getCompletionPercentage(tasksCompleted, totalTasks)}%`,
                backgroundColor: "#00B0DC",
              }}
            />
            <div className="task-label">{tasksCompleted} / {totalTasks} Tâches Complètes</div>
          </div>
        </div>

        <div className="task-bar">
          <div className="task-bar-remaining">
            <div
              className="task-progress"
              style={{
                width: `${getCompletionPercentage(tasksRemaining, totalTasks)}%`,
                backgroundColor: "#BF1300",
              }}
            />
            <div className="task-label">{tasksRemaining} / {totalTasks} Tâches Restantes</div>
          </div>
        </div>

        {/* Task Progress and Daily Task */}
        <div className="task-progress">
          <h3>Task Progress</h3>
          <div className="progress-items">
            {["In Progress", "Completed", "Not Started"].map((label, index) => (
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

        {/* Category and Productivity */}
        <div className="category">
          <h3>Category</h3>
          <canvas ref={categoryRef}></canvas>
        </div>

        <div className="productivity">
          <h3>Productivity</h3>
          <canvas ref={productivityRef}></canvas>
        </div>

        {/* Yearly Progress */}
        <div className="yearly-progress">
          <h3>Progress</h3>
          <select onChange={(e) => setTimeframe(e.target.value)} aria-label="Select Timeframe">
            <option value="year">Year</option>
            <option value="month">Month</option>
            <option value="week">Week</option>
          </select>
          <canvas ref={yearlyProgressRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
