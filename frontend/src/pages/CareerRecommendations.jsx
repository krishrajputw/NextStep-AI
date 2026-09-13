
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function CareerRecommendations() {
  const navigate = useNavigate();

  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("nextstepAssessment");

    if (!savedData) {
      navigate("/assessment");
      return;
    }

    const data = JSON.parse(savedData);

    if (!data.analysis) {
      navigate("/assessment/questions");
      return;
    }

    setAnalysis(data.analysis);
  }, [navigate]);

  if (!analysis) {
    return (
      <div className="recommendations-page">
        <div className="recommendations-card">
          <p className="recommendations-label">
            NEXTSTEP AI
          </p>

          <h1>Loading Your Results...</h1>
        </div>
      </div>
    );
  }

  const openCareerDetails = (career) => {
    navigate("/career-details", {
      state: { career },
    });
  };

  return (
    <div className="recommendations-page">
      <div className="recommendations-card">

        <p className="recommendations-label">
          NEXTSTEP AI • YOUR RESULTS
        </p>

        <h1>Your Career Direction</h1>

        <p className="recommendations-description">
          {analysis.profileSummary}
        </p>

        <div className="result-section">
          <h2>Your Strongest Qualities</h2>

          <div className="result-list">
            {analysis.strengths?.map((strength) => (
              <div key={strength}>
                {strength}
              </div>
            ))}
          </div>
        </div>

        <div className="career-matches">
          <h2>Top Career Matches</h2>

          {analysis.topCareers?.map((career, index) => (
            <div className="match-card" key={career.title}>

              <div className="match-number">
                0{index + 1}
              </div>

              <div className="match-content">

                <div className="match-top">
                  <h2>{career.title}</h2>

                  <span>
                    {career.matchScore}% Match
                  </span>
                </div>

                <p>
                  {career.matchReason}
                </p>

                <small>
                  AI assessment score — not a guaranteed
                  probability of career success.
                </small>

              </div>

              <button
                onClick={() => openCareerDetails(career)}
              >
                VIEW CAREER →
              </button>

            </div>
          ))}
        </div>

        <div className="result-section">
          <h2>Skills You Should Develop</h2>

          <div className="result-list">
            {analysis.skillGaps?.map((gap) => (
              <div key={gap}>
                {gap}
              </div>
            ))}
          </div>
        </div>

        <div className="result-section">
          <h2>Alternative Career Paths</h2>

          <div className="result-list">
            {analysis.alternativeCareers?.map((career) => (
              <div key={career}>
                {career}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default CareerRecommendations;

