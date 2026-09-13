import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

function CareerAssessment() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    sessionStorage.removeItem("nextstepQuestions");
  }, [navigate]);

  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hey! I'm NEX from NextStep AI. I'll ask you a few things to understand you better before we begin your career assessment.",
    },
    {
      type: "bot",
      text: "Let's start simple. Where are you in your journey right now?",
    },
  ]);

  const statusOptions = [
    "Class 10 Student",
    "Class 11-12 Student",
    "Diploma Student",
    "College Student",
    "Graduate",
    "Postgraduate",
    "Working Professional",
    "Career Switcher",
  ];

  const streamOptions = [
    "Science - PCM",
    "Science - PCB",
    "Commerce",
    "Arts & Humanities",
    "Vocational",
    "Other",
  ];

  const degreeOptions = [
    "B.Tech / B.E.",
    "BCA",
    "B.Sc",
    "BBA",
    "B.Com",
    "BA",
    "B.Pharm",
    "MBBS / Healthcare",
    "LLB",
    "Other",
  ];

  const strengthOptions = [
    "Problem Solving",
    "Creativity",
    "Communication",
    "Leadership",
    "Analytical Thinking",
    "Helping People",
    "Research",
    "Organizing Things",
    "Learning Quickly",
    "Working with Technology",
  ];

  const commonQuestions = [
    {
      key: "favoriteSubjects",
      question: "Which subjects or areas do you enjoy the most?",
      type: "input",
      placeholder: "e.g. Maths, Biology, Coding, Business",
    },
    {
      key: "strongSkills",
      question: "Which of these feel most natural to you?",
      type: "multi",
      options: strengthOptions,
    },
    {
      key: "hobbies",
      question:
        "What do you enjoy doing when you're not studying or working?",
      type: "input",
      placeholder: "e.g. Gaming, drawing, reading, sports",
    },
    {
      key: "naturalStrengths",
      question: "What do people usually say you're good at?",
      type: "input",
      placeholder: "e.g. Explaining things, solving problems",
    },
    {
      key: "dreamCareer",
      question: "Is there any career you're currently curious about?",
      type: "input",
      placeholder: "Optional — you can leave this blank",
    },
  ];

  const questionFlow = useMemo(() => {
    const status = answers.currentStatus;

    if (!status) {
      return [
        {
          key: "currentStatus",
          question: "Where are you in your journey right now?",
          type: "options",
          options: statusOptions,
        },
      ];
    }

    const flow = [];

    if (status === "Class 11-12 Student") {
      flow.push({
        key: "stream",
        question: "Which stream are you currently studying?",
        type: "options",
        options: streamOptions,
      });
    }

    if (
      ["College Student", "Graduate", "Postgraduate"].includes(status)
    ) {
      flow.push({
        key: "degree",
        question:
          "What degree are you studying or have you completed?",
        type: "options",
        options: degreeOptions,
      });

      flow.push({
        key: "branch",
        question:
          "What is your field, branch or specialization?",
        type: "input",
        placeholder:
          "e.g. Computer Science, Finance, Psychology",
      });
    }

    if (
      ["Working Professional", "Career Switcher"].includes(status)
    ) {
      flow.push({
        key: "branch",
        question: "What field are you currently working in?",
        type: "input",
        placeholder: "e.g. Software, Finance, Marketing",
      });
    }

    if (status === "Diploma Student") {
      flow.push({
        key: "branch",
        question:
          "What field or specialization are you studying?",
        type: "input",
        placeholder:
          "e.g. Mechanical, Civil, Computer Engineering",
      });
    }

    return [
      {
        key: "currentStatus",
        question: "Where are you in your journey right now?",
        type: "options",
        options: statusOptions,
      },
      ...flow,
      ...commonQuestions,
    ];
  }, [answers.currentStatus]);

  const question = questionFlow[current];

  const addMessage = (type, text) => {
    setMessages((previous) => [
      ...previous,
      {
        type,
        text,
      },
    ]);
  };

  const getResponse = (key) => {
    const responses = {
      currentStatus:
        "That's useful to know. Let's understand a little more about your current stage.",

      stream:
        "Got it. That gives me a better idea of your academic background.",

      degree:
        "Good, that helps me understand where you're coming from.",

      branch:
        "Makes sense. Now let's look at what actually interests you.",

      favoriteSubjects:
        "That's helpful. Now let's look at what comes naturally to you.",

      strongSkills:
        "Good to know. Let's look beyond academics for a moment.",

      hobbies:
        "That's useful. Your interests outside academics can tell us a lot too.",

      naturalStrengths:
        "That's helpful. One last thing before we start the main assessment.",

      dreamCareer:
        "Thanks for sharing that. I have a much better picture of you.",
    };

    return (
      responses[key] || "That's helpful. Let's continue."
    );
  };

  const saveProfile = (finalAnswers) => {
    const assessmentData = {
      currentStatus: finalAnswers.currentStatus || "",
      stream: finalAnswers.stream || "",
      degree: finalAnswers.degree || "",
      branch: finalAnswers.branch || "",
      favoriteSubjects:
        finalAnswers.favoriteSubjects || "",
      strongSkills: finalAnswers.strongSkills || [],
      hobbies: finalAnswers.hobbies || "",
      naturalStrengths:
        finalAnswers.naturalStrengths || "",
      dreamCareer: finalAnswers.dreamCareer || "",
    };

    localStorage.setItem(
      "nextstepAssessment",
      JSON.stringify(assessmentData)
    );

    console.log(
      "Student Profile:",
      assessmentData
    );

    navigate("/assessment/questions");
  };

  const handleAnswer = (value) => {
    if (!value || !question) return;

    const updatedAnswers = {
      ...answers,
      [question.key]: value,
    };

    setAnswers(updatedAnswers);

    addMessage(
      "user",
      Array.isArray(value)
        ? value.join(", ")
        : value
    );

    addMessage(
      "bot",
      getResponse(question.key)
    );

    const isLastQuestion =
      question.key === "dreamCareer";

    if (isLastQuestion) {
      setTimeout(() => {
        saveProfile(updatedAnswers);
      }, 700);

      return;
    }

    setTimeout(() => {
      setCurrent(
        (previous) => previous + 1
      );
    }, 400);
  };

  const submitInput = () => {
    if (!input.trim()) return;

    handleAnswer(input.trim());
    setInput("");
  };

  const toggleSkill = (skill) => {
    const selected =
      answers.strongSkills || [];

    if (selected.includes(skill)) {
      setAnswers({
        ...answers,
        strongSkills: selected.filter(
          (item) => item !== skill
        ),
      });
    } else {
      setAnswers({
        ...answers,
        strongSkills: [
          ...selected,
          skill,
        ],
      });
    }
  };

  const submitSkills = () => {
    const selected =
      answers.strongSkills || [];

    if (!selected.length) return;

    handleAnswer(selected);
  };

  const skipDreamCareer = () => {
    const updatedAnswers = {
      ...answers,
      dreamCareer: "",
    };

    setAnswers(updatedAnswers);

    addMessage(
      "user",
      "I'd rather explore options first."
    );

    addMessage(
      "bot",
      "That's completely fine. I'll keep your options open and let the assessment guide you."
    );

    setTimeout(() => {
      saveProfile(updatedAnswers);
    }, 700);
  };

  if (!question) return null;

  return (
    <div className="chat-assessment-page">
      <div className="chat-assessment">

        <div className="chat-header">
          <div className="chat-avatar">✦</div>

          <div>
            <span>NEXTSTEP AI</span>
            <h1>NEX</h1>
          </div>

          <div className="chat-status">
            <i></i>
            ONLINE
          </div>
        </div>

        <div className="chat-messages">

          {messages.map((message, index) => (
            <div
              key={index}
              className={`chat-message ${message.type}`}
            >
              {message.type === "bot" && (
                <div className="message-avatar">
                  ✦
                </div>
              )}

              <div className="message-bubble">
                {message.text}
              </div>
            </div>
          ))}

          <div className="chat-question">
            <span>
              QUESTION {current + 1}
            </span>

            <h2>
              {question.question}
            </h2>
          </div>

          {question.type === "options" && (
            <div className="chat-options">
              {question.options.map(
                (option) => (
                  <button
                    key={option}
                    onClick={() =>
                      handleAnswer(option)
                    }
                  >
                    <span>{option}</span>
                    <b>→</b>
                  </button>
                )
              )}
            </div>
          )}

          {question.type === "multi" && (
            <div className="chat-options">

              {question.options.map(
                (option) => {
                  const selected =
                    (
                      answers.strongSkills ||
                      []
                    ).includes(option);

                  return (
                    <button
                      key={option}
                      className={
                        selected
                          ? "selected"
                          : ""
                      }
                      onClick={() =>
                        toggleSkill(option)
                      }
                    >
                      <span>
                        {option}
                      </span>

                      <b>
                        {selected
                          ? "✓"
                          : "→"}
                      </b>
                    </button>
                  );
                }
              )}

              <button
                className="chat-continue"
                onClick={submitSkills}
                disabled={
                  !answers.strongSkills
                    ?.length
                }
              >
                CONTINUE →
              </button>
            </div>
          )}

          {question.type === "input" && (
            <div className="chat-input-area">

              <input
                type="text"
                value={input}
                placeholder={
                  question.placeholder
                }
                onChange={(e) =>
                  setInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    submitInput();
                  }
                }}
              />

              <button onClick={submitInput}>
                →
              </button>

              {question.key ===
                "dreamCareer" && (
                <button
                  className="chat-skip"
                  onClick={
                    skipDreamCareer
                  }
                >
                  SKIP
                </button>
              )}

            </div>
          )}

        </div>

        <div className="chat-footer">
          <span>
            Your answers help NEX understand
            your profile.
          </span>

          <span>
            {Math.min(
              current + 1,
              questionFlow.length
            )}{" "}
            / {questionFlow.length}
          </span>
        </div>

      </div>
    </div>
  );
}

export default CareerAssessment;