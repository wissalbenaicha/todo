import React, { useState, useEffect } from 'react';
import './TaskLandingPage.css';

function TaskLandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = ["/images/image1.png", "/images/image3.png", "/images/image4.png"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500); // Change l'image toutes les 2.5 secondes

    // Nettoyage de l'intervalle quand le composant est démonté
    return () => clearInterval(interval);
  }, [images]); // Ajoutez 'images' ici pour que l'effet s'exécute à chaque changement de 'images'

  return (
    <div className="task-landing-container">
      <div className="task-landing-content">
        <h1>Your Ultimate Task Management Solution</h1>
        <p>
          Our to-do list website helps you efficiently organize your daily tasks with a simple and
          intuitive interface. Create, manage, and track your priorities in just a few clicks to stay
          productive every day.
        </p>
        <div className="task-landing-form">
          <input type="email" placeholder="Enter your work email" className="task-email-input" />
          <button className="task-signup-button">Sign Up Free →</button>
        </div>
        <div className="task-stars">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star-half-o"></i>
        </div>
      </div>

      {/* Affichage dynamique des images */}
      <div className="task-landing-images">
        <img
          src={images[currentImageIndex]}
          alt={`Task Management Example ${currentImageIndex + 1}`}
          className="task-image"
        />
      </div>
    </div>
  );
}

export default TaskLandingPage;
