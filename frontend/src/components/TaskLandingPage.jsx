import React, { useState, useEffect } from 'react';
import '../styles/TaskLandingPage.css';

// Importation des images depuis src/assets/images
import image1 from '../assets/images/image1.png';
import image3 from '../assets/images/image3.png';
import image4 from '../assets/images/image4.png';

function TaskLandingPage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image3, image4];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [images]);

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
