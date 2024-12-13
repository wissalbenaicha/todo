import React from "react";
import "../styles/Stay.css";

// Importation des images locales
import image1 from "../assets/images/image1Stay.png";
import image2 from "../assets/images/image2Stay.png";
import image3 from "../assets/images/image3Stay.png";

function Stay() {
  return (
    <div className="Stay">
      <div className="container">
        <div className="text">
          <h1>Stay Connected and Organized, Anytime, Anywhere</h1>
          <p>
            In the office, at home, or on the go, our to-do list website helps
            you stay connected, organized, and productive by managing all your
            tasks in one place, no matter where you are.
          </p>
          <a href="#">Learn more →</a>
        </div>

        {/* Section images */}
        <div className="images">
          <img src={image1} alt="Task organization example 1" />
          <img src={image2} alt="Task organization example 2" />
          <img src={image3} alt="Task organization example 3" />
        </div>
      </div>
    </div>
  );
}

export default Stay;
