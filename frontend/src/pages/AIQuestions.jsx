import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AIQuestions() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const savedData = localStorage.getItem(
          "nextstepAssessment"
        );

        if (!savedData) {
          navigate("/assessment");
          return;
        }

        const cachedQuestions = sessionStorage.getItem(
          "nextstepQuestions"
        );

        if (cachedQuestions) {
          setQuestions(JSON.parse(cachedQuestions));
          return;
        }

        const assessmentData = JSON.parse(savedData);

        const response = await fetch(
          "http://localhost:5000/api/career/questions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(assessmentData),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to generate questions");
        }

        const data = await response.json();

        sessionStorage.setItem(
          "nextstepQuestions",
          JSON.stringify(data.questions)
        );

        setQuestions(data.questions);
      } catch (error) {
        console.error(error);

        setError(
          "Unable to generate questions. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    getQuestions();
  }, [navigate]);

  const selectAnswer = (answer) => {
    setAnswers((previousAnswers) => ({
      ...previousAnswers,
      [currentQuestion]: answer,
    }));
  };

  const nextQuestion = () => {
    if (!answers[currentQuestion]) return;

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(
        (previousQuestion) => previousQuestion + 1
      );
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previousQuestion) => previousQuestion - 1
      );
    }
  };

  const finishAssessment = async () => {
    if (!answers[currentQuestion]) return;

    try {
      setLoading(true);
      setIsAnalyzing(true);
      setError("");

      const savedData = JSON.parse(
        localStorage.getItem("nextstepAssessment")
      );

      const answersArray = questions.map(
        (_, index) => answers[index] || ""
      );

      const finalAssessment = {
        ...savedData,
        questions,
        answers: answersArray,
      };

      const analysisResponse = await fetch(
        "http://localhost:5000/api/career/analyze",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...savedData,
            questions,
            answers: answersArray,
          }),
        }
      );

      if (!analysisResponse.ok) {
        throw new Error("Failed to analyze profile");
      }

      const analysis = await analysisResponse.json();

      const completeResult = {
        ...finalAssessment,
        analysis,
      };

      localStorage.setItem(
        "nextstepAssessment",
        JSON.stringify(completeResult)
      );

      const token = localStorage.getItem("token");

      if (!token) {
        throw new Error("User is not logged in");
      }

      const saveResponse = await fetch(
        "http://localhost:5000/api/career/save",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...savedData,
            questions,
            answers: answersArray,
            analysis,
          }),
        }
      );

      if (!saveResponse.ok) {
        throw new Error("Failed to save assessment");
      }

      console.log(
        "Career Analysis:",
        completeResult
      );

      console.log(
        "Assessment saved to MongoDB"
      );

      sessionStorage.removeItem(
        "nextstepQuestions"
      );

      navigate("/recommendations");
    } catch (error) {
      console.error(error);

      setIsAnalyzing(false);

      setError(
        error.message === "User is not logged in"
          ? "Please login before starting the assessment."
          : "Unable to complete your assessment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  /* ANALYSIS WAITING SCREEN */

  if (isAnalyzing) {
    return (
      <div className="analysis-waiting-page">
        <div className="analysis-background"></div>

        <div className="analysis-waiting-card">
          <div className="ai-orbit">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>

            <div className="ai-core">
              <span>AI</span>
            </div>
          </div>

          <p className="analysis-label">
            NEXTSTEP AI • ANALYSIS
          </p>

          <h1>
            Finding Your
            <span> Direction.</span>
          </h1>

          <p className="analysis-description">
            We're connecting your answers, interests,
            strengths and preferences to possible career paths.
          </p>

          <div className="analysis-status">
            <div className="analysis-status-item active">
              <span>01</span>
              <p>Reading your answers</p>
              <b>✓</b>
            </div>

            <div className="analysis-status-item active">
              <span>02</span>
              <p>Understanding your strengths</p>
              <b>✓</b>
            </div>

            <div className="analysis-status-item active">
              <span>03</span>
              <p>Finding career patterns</p>
              <i></i>
            </div>

            <div className="analysis-status-item">
              <span>04</span>
              <p>Preparing your career matches</p>
              <i></i>
            </div>
          </div>

          <div className="analysis-loader">
            <div></div>
          </div>

          <small>
            This may take a few seconds.
          </small>
        </div>
      </div>
    );
  }

  /* INITIAL QUESTION GENERATION */

  if (loading) {
    return (
      <div className="assessment-page">
        <div className="assessment-card loading-card">
          <p className="assessment-label">
            NEXTSTEP AI
          </p>

          <div className="loading-spinner"></div>

          <h1>Preparing Your Assessment</h1>

          <p className="auth-description">
            NextStep is creating questions based on your
            interests, strengths and background.
          </p>

          <div className="loading-line">
            <div></div>
          </div>

          <small>
            Please wait a moment...
          </small>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="assessment-page">
        <div className="assessment-card">
          <p className="assessment-label">
            NEXTSTEP AI
          </p>

          <h1>Something went wrong</h1>

          <p className="auth-description">
            {error}
          </p>

          <button
            className="next-button"
            onClick={() => window.location.reload()}
          >
            TRY AGAIN →
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="assessment-page">
        <div className="assessment-card">
          <p className="assessment-label">
            NEXTSTEP AI
          </p>

          <h1>No questions generated</h1>

          <p className="auth-description">
            We couldn't generate your assessment questions.
          </p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="assessment-page">
      <div className="assessment-card">
        <div className="assessment-top">
          <div>
            <p className="assessment-label">
              NEXTSTEP AI • PERSONALIZED ASSESSMENT
            </p>

            <h1>Let's Understand You</h1>
          </div>

          <span>
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>

        <div className="progress-bar">
          <div
            style={{
              width: `${
                ((currentQuestion + 1) /
                  questions.length) *
                100
              }%`,
            }}
          ></div>
        </div>

        <div className="question-section">
          <p>{question.category}</p>

          <h2>{question.question}</h2>

          <div className="options">
            {question.options.map((option) => (
              <button
                key={option}
                className={
                  answers[currentQuestion] === option
                    ? "selected"
                    : ""
                }
                onClick={() => selectAnswer(option)}
              >
                <span>{option}</span>
                <b>→</b>
              </button>
            ))}
          </div>
        </div>

        <div className="assessment-actions">
          {currentQuestion > 0 && (
            <button
              className="back-button"
              onClick={previousQuestion}
            >
              ← BACK
            </button>
          )}

          {currentQuestion < questions.length - 1 ? (
            <button
              className="next-button"
              onClick={nextQuestion}
              disabled={!answers[currentQuestion]}
            >
              NEXT →
            </button>
          ) : (
            <button
              className="next-button"
              onClick={finishAssessment}
              disabled={!answers[currentQuestion]}
            >
              ANALYZE MY PROFILE →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default AIQuestions;