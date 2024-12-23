import React from "react";
import "../styles/Seamless.css";
import imageSeamless from "../assets/images/imageSeamless.png";

function Seamless() {
  return (
    <div className="Seamless">
      <div className="container">
        {/* Section images */}
        <div className="images">
          <img src={imageSeamless} alt="Integration with Tools" />
        </div>
        <div className="text">
          <h1>Seamless Integration with Your Favorite Tools</h1>
          <p>
            Whether you need to schedule tasks, set reminders, or track your
            progress, our to-do list website seamlessly integrates with your
            favorite productivity tools to keep everything in sync
          </p>
          <a href="#">Learn more →</a>
        </div>
      </div>
    </div>
  );
}

export default Seamless;
