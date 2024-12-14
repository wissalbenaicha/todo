import React, { useState } from 'react';
import axios from 'axios';
import '../styles/Signup.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation simple des mots de passe
    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas");
      return;
    }

    const userData = {
      nomuser: name,          // Utilise 'nomuser' ici
      emailuser: email,       // Utilise 'emailuser' ici
      passworduser: password, // Utilise 'passworduser' ici
    };

    try {
      const response = await axios.post('http://localhost:8000/api/signup/', userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setMessage('Inscription réussie!');
      // Réinitialisation des champs après l'inscription
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
    } catch (error) {
      if (error.response) {
        // Affiche les erreurs détaillées
        console.error('Backend Errors:', error.response.data);
        setMessage(error.response.data.detail || 'Erreur lors de l\'inscription');
      } else {
        // Erreur de réseau
        setMessage('Problème de connexion au serveur');
      }
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side */}
      <div className="w-1/2 bg-blue-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold mb-6">Join Us Today!</h1>
          <p className="text-lg mb-4">Create your account to start managing tasks and tracking progress.</p>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div className="mb-4">
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          {/* Message */}
          {message && <p className="text-center text-red-500 mb-4">{message}</p>}

          {/* Sign Up Button */}
          <button onClick={handleSubmit} className="w-full bg-blue-900 text-white py-2 rounded-lg mb-4">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
