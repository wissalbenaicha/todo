import React from 'react';
import '../styles/Signup.css';

const Signup = () => {
  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-6">Join Us Today!</h1>
          <p className="text-lg mb-4">Create your account to start managing tasks and tracking progress.</p>

          {/* Mockup cards */}
          <div className="mockup-container">
            <div className="mockup-card">
              <img src="https://img.icons8.com/fluency/48/checklist.png" alt="Checklist icon" />
              <p className="mockup-card-title">Stay Organized</p>
              <p className="mockup-card-description">
                Manage your tasks and keep everything in order.
              </p>
            </div>

            <div className="mockup-card">
              <img src="https://img.icons8.com/fluency/48/task.png" alt="Task icon" />
              <p className="mockup-card-title">Achieve Goals</p>
              <p className="mockup-card-description">
                Set milestones and accomplish your objectives.
              </p>
            </div>

            <div className="mockup-card">
              <img src="https://img.icons8.com/fluency/48/combo-chart.png" alt="Chart icon" />
              <p className="mockup-card-title">Track Progress</p>
              <p className="mockup-card-description">
                Visualize your data and monitor your performance easily.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Right Side */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-96">
          <h2 className="text-2xl font-bold mb-6">Create Your Account</h2>
          <p className="text-gray-500 mb-6">Sign up to get started with your tasks today.</p>

          {/* Name Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter your name"
            />
          </div>

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
              placeholder="Create a password"
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Confirm your password"
            />
          </div>

          {/* Sign Up Button */}
          <button className="w-full bg-blue-900 text-white py-2 rounded-lg mb-4">
            Sign Up
          </button>

          {/* Or Sign Up With */}
          <div className="text-center text-gray-500 mb-4">Or sign up with</div>
          <div className="flex justify-center gap-4">
            <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2">
              <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google logo" className="h-5" />
              Google
            </button>
            <button className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2">
              <img src="https://img.icons8.com/color/48/000000/facebook.png" alt="Facebook logo" className="h-5" />
              Facebook
            </button>
          </div>

          {/* Sign In Link */}
          <p className="text-center text-gray-500 mt-4">
            Already have an account? <a href="#" className="text-blue-500">Sign In</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
