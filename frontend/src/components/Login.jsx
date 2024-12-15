import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");          // Email de l'utilisateur
  const [password, setPassword] = useState("");    // Mot de passe de l'utilisateur
  const [message, setMessage] = useState("");      // Message de retour (succès ou erreur)

  // Fonction de gestion de la soumission du formulaire de connexion
  const handleLogin = async (e) => {
    e.preventDefault();  // Empêcher le comportement par défaut du formulaire

    const userData = {
      emailuser: email,       // Utilisation de 'emailuser' comme nom du champ
      passworduser: password, // Utilisation de 'passworduser' comme nom du champ
    };

    try {
      // Envoi de la requête POST pour la connexion
      const response = await axios.post('http://localhost:8000/api/login/', userData, {
        headers: {
          'Content-Type': 'application/json',  // Spécification du type de contenu
        },
      });
      
      console.log('Login successful', response.data);

      // Sauvegarder les tokens d'accès et de rafraîchissement dans localStorage
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);

      setMessage('Login successful');
      
      // Optionnellement, rediriger l'utilisateur vers une autre page après la connexion
      // window.location.href = '/dashboard';  // Redirection vers une page de tableau de bord
    } catch (error) {
      setMessage('Error logging in');  // Message d'erreur si la connexion échoue
      console.error('Error logging in:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Left Side (Arrière-plan bleu) */}
      <div className="w-1/2 bg-blue-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-4xl font-bold">Welcome back!</h1>
        </div>
      </div>

      {/* Right Side (Formulaire de connexion) */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <div className="w-96">
          <h2 className="text-2xl font-bold mb-6">Sign In to your Account</h2>
          <p className="text-gray-500 mb-6">Please enter your details.</p>

          {/* Champ Email */}
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}  // Mise à jour de l'email
              required
            />
          </div>

          {/* Champ Mot de passe */}
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Mise à jour du mot de passe
              required
            />
          </div>

          {/* Message de retour (succès ou erreur) */}
          {message && <p className="text-center text-red-500 mb-4">{message}</p>}

          {/* Bouton de connexion */}
          <button onClick={handleLogin} className="w-full bg-blue-900 text-white py-2 rounded-lg mb-4">
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
