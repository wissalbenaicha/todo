import React from "react";
import '../styles/Login.css';
const Login = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="mb-8">
            {/* Mockup images */}
            <div className="bg-white p-4 rounded-lg shadow-lg inline-block">
  <div className="flex items-center gap-4">
    <img
      src="https://img.icons8.com/fluency/48/checklist.png" // Icône checklist
      alt="Checklist"
      className="h-10 w-10"
    />
    <p className="text-gray-700 text-lg font-semibold">Manage Tasks</p>
  </div>
  <div className="mt-4 text-gray-500">
    Organize your day with your To-Do list!
  </div>
</div>
<div className="bg-white p-4 rounded-lg shadow-lg mt-4 inline-block">
  <div className="flex items-center gap-4">
    <img
      src="https://img.icons8.com/fluency/48/task.png" // Icône tâches
      alt="Task"
      className="h-10 w-10"
    />
    <p className="text-gray-700 text-lg font-semibold">Track Progress</p>
  </div>
  <div className="mt-4 text-gray-500">
    Stay on top of your goals and deadlines.
  </div>
</div>

          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-96">
          <h2 className="text-2xl font-bold mb-6">Sign In to your Account</h2>
          <p className="text-gray-500 mb-6">Welcome back! Please enter your details.</p>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter your password"
            />
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <a href="#" className="text-blue-500 text-sm">Forgot Password?</a>
          </div>

          {/* Sign In Button */}
          <button className="w-full bg-blue-900 text-white py-2 rounded-lg mb-4">
            Sign In
          </button>

          {/* Or Sign In With */}
          <div className="text-center text-gray-500 mb-4">Or sign in with</div>
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2">
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="h-5" />
              Google
            </button>
            <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2">
              <img src="https://img.icons8.com/color/48/000000/facebook.png" alt="Facebook" className="h-5" />
              Facebook
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-500 mt-4">
            Don't have an account? <a href="#" className="text-blue-500">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
