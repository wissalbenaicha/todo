import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import CalendarPage from "./pages/CalendarPage";
import Profile from "./components/Profile";
import SignUpPage from "./pages/SignUp";
import Login from "./components/Login";
import VerifyEmail from "./components/VerifyEmail";
import DashboardPage from "./pages/DashboardPage";
import TachePage from "./pages/TachePage";
import TachePage2 from "./pages/TachePage2";
import AddTask from "./components/Addtask";
import "./App.css";
import { TaskProvider } from './context/TaskContext'; // Importer le contexte

function App() {
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  const handleProfileClick = () => {
    setIsProfileVisible((prev) => !prev);
  };

  const closeProfile = () => {
    setIsProfileVisible(false);
  };

  return (
    <TaskProvider>
      <Router>
        <div className="app">
          {isProfileVisible && (
            <div className="profile-overlay">
              <Profile onClose={closeProfile} />
            </div>
          )}

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/LandingPage" element={<LandingPage />} />
            <Route path="/tasks" element={<TachePage2 />} />
            <Route path="/TachePage" element={<TachePage />} />
            <Route path="/TachePage2" element={<TachePage2 />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/calendar" element={<CalendarPage onProfileClick={handleProfileClick} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </Router>
    </TaskProvider>
  );
}

export default App;
