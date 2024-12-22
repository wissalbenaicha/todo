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

  // States for task completion and remaining tasks
  const [tasksCompleted, setTasksCompleted] = useState(0);
  const [tasksRemaining, setTasksRemaining] = useState(0);
  const totalTasks = tasksCompleted + tasksRemaining;
  const [timeframe, setTimeframe] = useState("year"); // Track user's selected timeframe

  const getCompletionPercentage = (completed, total) =>
    total === 0 ? 0 : (completed / total) * 100;

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

    // Initialiser les graphiques avec des valeurs à 0
    const initialData = { value: 0, color: "#e0e0e0" };

    taskProgressRefs.forEach((ref) => {
      renderChart(
        ref,
        "doughnut",
        {
          labels: ["Progress"],
          datasets: [
            {
              data: [initialData.value, 100 - initialData.value],
              backgroundColor: [initialData.color, "#f5f5f5"],
            },
          ],
        },
        {
          cutout: "70%",
          plugins: {
            legend: { display: false },
            datalabels: {
              color: "black",
              font: {
                weight: "bold",
                size: 18,
              },
              formatter: (value) => `${Math.round(value)}%`,
            },
          },
        }
      );
    });

    renderChart(
      dailyTaskRef,
      "bar",
      {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        datasets: [
          {
            label: "Tasks",
            data: [0, 0, 0, 0, 0],
            backgroundColor: "#00E5FF",
            borderRadius: 80,
            barThickness: 15,
          },
        ],
      },
      {
        plugins: { legend: { display: false } },
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            max: 10,
          },
        },
      }
    );

    renderChart(
      productivityRef,
      "bar",
      {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          { label: "Design", data: [0, 0, 0, 0, 0, 0, 0], backgroundColor: "#00E5FF" },
          { label: "Sport", data: [0, 0, 0, 0, 0, 0, 0], backgroundColor: "#BF1300" },
          { label: "Web Dev", data: [0, 0, 0, 0, 0, 0, 0], backgroundColor: "#00B0DC" },
        ],
      },
      {
        plugins: {
          legend: { position: "bottom" },
          datalabels: {
            display: false,
          },
        },
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 20,
        },
      }
    );

    renderChart(
      categoryRef,
      "doughnut",
      {
        labels: ["Sport", "Design", "Web Dev"],
        datasets: [
          {
            data: [0, 0, 0],
            backgroundColor: ["#BF1300", "#00B0DC", "#00E5FF"],
          },
        ],
      },
      {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          datalabels: {
            font: { size: 18, weight: "bold" },
            color: "black",
          },
        },
        layout: {
          padding: 20,
        },
      }
    );

    const getYearlyData = () => ({
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      datasets: [
        {
          label: "Progress",
          data: Array(12).fill(0),
          backgroundColor: Array(12).fill("#00B0DC"),
        },
      ],
    });

    renderChart(yearlyProgressRef, "bar", getYearlyData(), {
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

        <div className="category">
          <h3>Category</h3>
          <canvas ref={categoryRef}></canvas>
        </div>

        <div className="productivity">
          <h3>Productivity</h3>
          <canvas ref={productivityRef}></canvas>
        </div>

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
