import React from "react";
import "../styles/Work.css";
import user1 from "../assets/images/image1Work.png";
import user2 from "../assets/images/image2Work.png";
import user3 from "../assets/images/image3Work.png";
import user4 from "../assets/images/image4Work.webp";

function Work() {
  return (
    <div className="work-section">
      <div className="container">
        <h1>Built for the way you work</h1>
        <div className="categories">
          <button>Brainstorming</button>
          <button>Diagramming</button>
          <button>Meetings & Workshops</button>
          <button>Scrum Events</button>
          <button>Mapping</button>
          <button>Research & Design</button>
          <button>Strategic Planning</button>
        </div>
        <div className="content-section">
          <div className="info-card">
            <h2>Turn Tasks into Actionable Plans</h2>
            <p>
              Capture your tasks and bring them to life with notes, checklists,
              categories, and deadlines — everything you need to stay organized
              and productive.
            </p>
            <a href="#">Learn more →</a>
          </div>
          <div className="task-cards">
            <div className="task-card">
              <span className="tag preparation">Preparation Test</span>
              <h3>Study for Upcoming Semester Exams</h3>
              <p>
                Review all relevant materials and practice problem-solving for
                the next exams. Organize study sessions if needed.
              </p>
              <div className="progress-bar">
                <div className="progress" style={{ width: "70%" }}></div>
              </div>
              <div className="task-footer">
                <span>📅 Oct - Dec 2024</span>
                <div className="avatars">
                  <img src={user1} alt="User 1" />
                  <img src={user2} alt="User 2" />
                </div>
              </div>
            </div>
            <div className="task-card">
              <span className="tag sad">SAD</span>
              <h3>Document Project Requirements</h3>
              <p>
                Analyze the system requirements and create detailed project
                documentation to ensure all needs are met.
              </p>
              <div className="progress-bar">
                <div className="progress2" style={{ width: "50%" }}></div>
              </div>
              <div className="task-footer">
                <span>📅 Oct - Dec 2024</span>
                <div className="avatars">
                  <img src={user3} alt="User 3" />
                  <img src={user4} alt="User 4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Work;
