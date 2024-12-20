import React, { useState } from "react";
import { MoreVertical, Plus, Search, Bell } from "lucide-react";
import "../styles/TaskPage2.css";

const TasksPage2 = () => {
  const [activeTab, setActiveTab] = useState("in-progress");
  const [searchQuery, setSearchQuery] = useState("");

  // Exemples de tâches
  const tasks = [
    {
      id: 1,
      title: "Design Homepage",
      description: "Create the homepage for the new project.",
      category: "Design",
      color: "task-blue",
      progress: 50,
      assignee: { avatar: "https://via.placeholder.com/40", name: "John Doe" },
      period: "Due in 2 days",
    },
    {
      id: 2,
      title: "Fix Login Bug",
      description: "Resolve the issue with user login in production.",
      category: "Development",
      color: "task-pink",
      progress: 80,
      assignee: {
        avatar: "https://via.placeholder.com/40",
        name: "Jane Smith",
      },
      period: "Due in 1 day",
    },
  ];

  const tasks2 = [
    {
      id: 3,
      title: "Prepare Presentation",
      description: "Prepare the slides for the team meeting.",
      category: "Marketing",
      color: "task-yellow",
      progress: 30,
      assignees: [
        { avatar: "https://via.placeholder.com/40" },
        { avatar: "https://via.placeholder.com/40" },
      ],
      period: "Due tomorrow",
    },
    {
      id: 4,
      title: "Update Documentation",
      description: "Add new API endpoints to the documentation.",
      category: "Documentation",
      color: "task-orange",
      progress: 100,
      assignee: {
        avatar: "https://via.placeholder.com/40",
        name: "Alice Brown",
      },
      period: "Completed",
    },
  ];

  const allTasks = [...tasks, ...tasks2];

  const filteredTasks = allTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen tasks-container">
      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">My tasks</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 search-input w-64"
            />
          </div>
          <button className="p-2 rounded-full hover:bg-gray-100 relative">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Task Navigation */}
      <div className="flex items-center gap-6 mb-8 border-b border-gray-200">
        <div className="flex gap-6">
          <button
            className={`nav-button pb-2 ${
              activeTab === "in-progress"
                ? "text-blue-600 active"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("in-progress")}
          >
            In progress
          </button>
          <button
            className={`nav-button pb-2 ${
              activeTab === "completed"
                ? "text-blue-600 active"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>
        <button className="flex items-center gap-2 text-blue-600 add-task-button ml-auto">
          <Plus className="h-4 w-4" />
          Add new task
        </button>
      </div>

      {/* Tasks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.map((task, index) => (
          <div key={index} className="task-card bg-white rounded-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span
                  className={`category-tag inline-block px-3 py-1 rounded-full text-sm ${task.color}`}
                >
                  {task.category}
                </span>
              </div>
              <button className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-50">
                <MoreVertical className="h-5 w-5" />
              </button>
            </div>

            <h3 className="text-lg font-semibold mb-2 text-gray-900">
              {task.title}
            </h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {task.description}
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex-grow bg-gray-100 rounded-full h-2">
                  <div
                    className={`progress-bar ${task.color} rounded-full h-2`}
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="avatar-group flex -space-x-2">
                  {task.assignees
                    ? task.assignees.map((assignee, idx) => (
                        <img
                          key={idx}
                          src={assignee.avatar}
                          alt="Avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      ))
                    : task.assignee && (
                        <img
                          src={task.assignee.avatar}
                          alt={task.assignee.name}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                </div>
                <span className="text-sm text-gray-500">{task.period}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TasksPage2;
