import React from "react";
import "../styles/Work.css";

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
                  <img
                    src="https://th.bing.com/th/id/R.f14a8e4cb974927357ae66fc892b3c2b?rik=yZy5ahYnnjHZww&pid=ImgRaw&r=0"
                    alt="User 1"
                  />
                  <img
                    src="https://i1.rgstatic.net/ii/profile.image/1059994531278849-1629733798801_Q512/Leana-Van-Der-Merwe.jpg"
                    alt="User 2"
                  />
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
                  <img
                    src="https://d2uur722ua7fvv.cloudfront.net/photos/Dr-Gabriela-Gryczynski-MD-325701-circle_large__v1__.png"
                    alt="User 3"
                  />
                  <img
                    src="https://static.wixstatic.com/media/d3f591_37c6da634a374a1e9a2962c3add5a3ff~mv2.png/v1/fill/w_230,h_230,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/oliver_stevenson.png"
                    alt="User 4"
                  />
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
