
import { useLocation, useNavigate } from "react-router-dom";

function cleanText(text) {
  if (typeof text !== "string") return "";

  return text
    .replace(/^#+\s*/gm, "")
    .replace(/\*\*/g, "")
    .replace(/^\s*[-•]\s*/gm, "")
    .trim();
}

function cleanList(list) {
  if (!Array.isArray(list)) return [];

  return list
    .map((item) => cleanText(item))
    .filter(Boolean);
}

function CareerDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const career = location.state?.career;

  if (!career) {
    return (
      <div className="career-details-page">
        <div className="career-details-container">
          <h1>Career not found</h1>

          <p>Please go back and select a career again.</p>

          <button onClick={() => navigate("/recommendations")}>
            BACK TO RECOMMENDATIONS
          </button>
        </div>
      </div>
    );
  }

  const skills = cleanList(career.skills);
  const skillGaps = cleanList(career.skillGaps);
  const roadmap = cleanList(career.roadmap);

  return (
    <div className="career-details-page">
      <div className="career-details-container">

        <button
          className="back-button"
          onClick={() => navigate("/recommendations")}
        >
          ← BACK
        </button>

        <div className="career-header">
          <span>CAREER MATCH</span>

          <h1>{cleanText(career.title)}</h1>

          <div className="match-score">
            {career.matchScore}% MATCH
          </div>
        </div>

        <section className="career-section">
          <h2>Why This Career?</h2>

          <div className="career-reason">
            <p>{cleanText(career.matchReason)}</p>
          </div>
        </section>

        <section className="career-section">
          <h2>Important Skills</h2>

          <div className="career-list">
            {skills.map((skill, index) => (
              <div className="skill-item" key={index}>
                <span>✦</span>
                <p>{skill}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="career-section">
          <h2>Skills You Should Develop</h2>

          <div className="career-list development-list">
            {skillGaps.map((skill, index) => (
              <div className="skill-item" key={index}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>{skill}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="career-section">
          <h2>Career Roadmap</h2>

          <div className="roadmap">
            {roadmap.map((step, index) => (
              <div className="roadmap-step" key={index}>
                <span>
                  {String(index + 1).padStart(2, "0")}
                </span>

                <p>{step}</p>
              </div>
            ))}
          </div>
        </section>

        <button
          className="recommendation-button"
          onClick={() => navigate("/recommendations")}
        >
          EXPLORE OTHER CAREERS →
        </button>

      </div>
    </div>
  );
}

export default CareerDetails;

