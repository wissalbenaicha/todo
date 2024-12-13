import React from "react";
import "../styles/Stay.css";
import image1 from "../assets/images/image1Stay.png";

function Stay() {
  return (
    <div className="Stay">
      <div className="container">
        <div className="text">
          <h1>Stay Connected and Organized,Anytime,Anywhere</h1>
          <p>
            In the office, at home, or on the go, our to-do list website helps
            you stay connected, organized, and productive by managing all your
            tasks in one place, no matter where you are.
          </p>
          <a href="#">Learn more →</a>
        </div>

        {/* Section images */}
        <div className="images">
          <img
            src="https://www.saeiitbhu.in/images/project/projects1.png"
            alt=""
          />
          <img
            src="https://www.saeiitbhu.in/images/project/projects2.png"
            alt=""
          />
          <img
            src="https://www.saeiitbhu.in/images/project/projects3.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Stay;
