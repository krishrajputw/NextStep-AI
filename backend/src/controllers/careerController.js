
const { GoogleGenAI } = require("@google/genai");
const Assessment = require("../models/Assessment");


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


const generateCareerQuestions = async (req, res) => {
  try {
    const {
      currentStatus,
      stream,
      degree,
      branch,
      favoriteSubjects,
      strongSkills,
      hobbies,
      naturalStrengths,
      dreamCareer,
    } = req.body;

    if (!currentStatus) {
      return res.status(400).json({
        message: "Current status is required",
      });
    }

    const prompt = `
You are NextStep AI, an expert career counsellor.

Your task is to create a personalized career discovery assessment for a student.

STUDENT PROFILE:

Current Status:
${currentStatus || "Not provided"}

Stream:
${stream || "Not provided"}

Degree:
${degree || "Not provided"}

Branch / Field:
${branch || "Not provided"}

Favorite Subjects / Areas:
${favoriteSubjects || "Not provided"}

Strong Skills:
${Array.isArray(strongSkills)
  ? strongSkills.join(", ")
  : strongSkills || "Not provided"}

Hobbies:
${hobbies || "Not provided"}

Natural Strengths:
${naturalStrengths || "Not provided"}

Dream Career:
${dreamCareer || "Not decided"}

IMPORTANT:

The student's current education, degree, branch or stream must NOT determine their career.

For example:
- A B.Tech student can be recommended management, finance, teaching, civil services, design, entrepreneurship, etc.
- A commerce student can be recommended technology, design, psychology, law, etc.
- A science student can be recommended business, media, law, management, etc.

Use the student's complete profile only as context.

Your questions should discover the student's actual preferences, thinking style, motivation and working style.

Explore areas such as:

- Types of problems they enjoy solving
- What kind of work feels meaningful to them
- People-oriented vs independent work
- Analytical vs creative vs practical work
- Research and curiosity
- Communication and persuasion
- Leadership and responsibility
- Stability vs risk
- Structured vs flexible environments
- Building things vs analyzing things
- Helping people vs working with systems/data
- Short-term achievement vs long-term mastery
- Preferred work environment
- Career motivation and priorities

QUESTION QUALITY RULES:

1. Generate EXACTLY 8 questions.

2. Each question must have EXACTLY 4 or 5 answer options.

3. Questions must be personalized using the student's profile.

4. Do NOT simply ask:
   - "Are you creative?"
   - "Are you good at communication?"
   - "Do you like technology?"
   - "Are you a leader?"

   Instead, use realistic situations or choices that reveal these traits naturally.

5. Example of a good question:

   "Imagine you are given a difficult project with no clear instructions. What would you naturally do first?"

   Options:
   - Break the problem into smaller parts
   - Research how others solved similar problems
   - Discuss it with people and collect ideas
   - Experiment with different approaches
   - Look for someone experienced to guide you

6. Do not mention or reveal which career a particular answer represents.

7. Do not make questions feel like an obvious personality test.

8. Do not require professional career knowledge.

9. Questions should be simple enough for a student to understand.

10. Avoid repeating the same concept in multiple questions.

11. Cover different dimensions across the 8 questions.

12. At least:
   - 2 questions should use realistic situations/scenarios.
   - 1 question should explore work environment preference.
   - 1 question should explore career priorities.
   - 1 question should explore problem-solving approach.
   - 1 question should explore people vs independent work.
   - 1 question should explore uncertainty/risk/stability.
   - 1 question should explore motivation or long-term goals.

13. Do not make the questions biased toward technology or IT careers.

14. Consider careers from many domains including:

   Technology
   Data & Research
   Science
   Healthcare
   Psychology
   Law
   Finance
   Business
   Management
   Design
   Media
   Marketing
   Education
   Government
   Civil Services
   Defence
   Hospitality
   Entrepreneurship
   Other professional careers

15. The student's dream career should be treated as a preference, NOT as the correct answer.

16. If the student's dream career conflicts with their other answers, do not force the assessment toward that career.

17. Return ONLY valid JSON matching the requested schema.
`;

    const models = [
      "gemini-3.7-flash",
      "gemini-3.6-flash",
      "gemini-3.5-flash",
    ];

    let response;

    for (const model of models) {
      try {
        console.log(`Trying Gemini model: ${model}`);

        response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",

            responseSchema: {
              type: "object",

              properties: {
                questions: {
                  type: "array",

                  items: {
                    type: "object",

                    properties: {
                      category: {
                        type: "string",
                      },

                      question: {
                        type: "string",
                      },

                      options: {
                        type: "array",

                        items: {
                          type: "string",
                        },
                      },
                    },

                    required: [
                      "category",
                      "question",
                      "options",
                    ],
                  },
                },
              },

              required: ["questions"],
            },
          },
        });

        console.log(`Success with model: ${model}`);
        break;
      } catch (error) {
        console.log(`${model} failed: ${error.status}`);

        if (model === models[models.length - 1]) {
          throw error;
        }
      }
    }

    const data = JSON.parse(response.text);

    res.json(data);
  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      message: "Failed to generate career questions",
    });
  }
};


const analyzeCareerProfile = async (req, res) => {
  try {
    const {
      currentStatus,
      stream,
      degree,
      branch,
      favoriteSubjects,
      strongSkills,
      hobbies,
      naturalStrengths,
      dreamCareer,
      questions,
      answers,
    } = req.body;

    if (!currentStatus || !questions || !answers) {
      return res.status(400).json({
        message: "Assessment data is incomplete",
      });
    }

    if (!Array.isArray(questions) || !Array.isArray(answers)) {
      return res.status(400).json({
        message: "Questions and answers must be arrays",
      });
    }

    if (questions.length !== answers.length) {
      return res.status(400).json({
        message: "Questions and answers do not match",
      });
    }

    const assessment = questions.map((question, index) => ({
      category: question.category,
      question: question.question,
      answer: answers[index],
    }));

    const prompt = `
You are NextStep AI, an expert career counsellor.

Analyze the student's profile and their answers to the career discovery assessment.

STUDENT PROFILE:

Current Status:
${currentStatus || "Not provided"}

Stream:
${stream || "Not provided"}

Degree:
${degree || "Not provided"}

Branch / Field:
${branch || "Not provided"}

Favorite Subjects / Areas:
${favoriteSubjects || "Not provided"}

Strong Skills:
${Array.isArray(strongSkills)
  ? strongSkills.join(", ")
  : strongSkills || "Not provided"}

Hobbies:
${Array.isArray(hobbies)
  ? hobbies.join(", ")
  : hobbies || "Not provided"}

Natural Strengths:
${naturalStrengths || "Not provided"}

Dream Career:
${dreamCareer || "Not decided"}

ASSESSMENT RESPONSES:

${JSON.stringify(assessment, null, 2)}

IMPORTANT CAREER GUIDANCE RULES:

1. Do NOT automatically recommend careers based on the student's degree,
   branch or current stream.

2. The student's answers, interests, strengths, motivation, preferences
   and working style are more important than their educational background.

3. The dream career is only a preference.
   Do not recommend it automatically if the assessment answers do not
   support it.

4. Consider careers from many domains:

   Technology
   Data & Analytics
   Research
   Science
   Healthcare
   Psychology
   Law
   Finance
   Business
   Management
   Consulting
   Design
   Marketing
   Media
   Education
   Government
   Civil Services
   Defence
   Hospitality
   Entrepreneurship
   Other professional careers

5. Do not limit recommendations to careers directly related to the
   student's current education.

6. Identify patterns across the answers rather than relying on a
   single answer.

7. Recommendations should be realistic for the student's current stage.

8. Explain WHY each recommended career fits the student's profile.

9. Identify important skills the student already appears to have.

10. Identify skill gaps that the student should work on.

11. Give a practical roadmap for each recommended career.

12. Do not make unrealistic promises about salary, jobs or success.

13. Recommend EXACTLY 5 career options.

14. Rank the careers from strongest match to weakest match.

15. Match score must be a number between 0 and 100.

16. Provide exactly 3 alternative careers.

17. The analysis should feel like genuine career counselling,
    not a generic personality-test result.

Return ONLY valid JSON matching the requested schema.
`;

    const models = [
      "gemini-3.7-flash",
      "gemini-3.6-flash",
      "gemini-3.5-flash",
    ];

    let response;

    for (const model of models) {
      try {
        console.log(`Trying Gemini model: ${model}`);

        response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",

            responseSchema: {
              type: "object",

              properties: {
                profileSummary: {
                  type: "string",
                },

                strengths: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },

                skillGaps: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },

                topCareers: {
                  type: "array",

                  items: {
                    type: "object",

                    properties: {
                      title: {
                        type: "string",
                      },

                      matchScore: {
                        type: "number",
                      },

                      matchReason: {
                        type: "string",
                      },

                      skills: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },

                      skillGaps: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },

                      roadmap: {
                        type: "array",
                        items: {
                          type: "string",
                        },
                      },
                    },

                    required: [
                      "title",
                      "matchScore",
                      "matchReason",
                      "skills",
                      "skillGaps",
                      "roadmap",
                    ],
                  },
                },

                alternativeCareers: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
              },

              required: [
                "profileSummary",
                "strengths",
                "skillGaps",
                "topCareers",
                "alternativeCareers",
              ],
            },
          },
        });

        console.log(`Success with model: ${model}`);
        break;
      } catch (error) {
        console.log(`${model} failed: ${error.status}`);

        if (model === models[models.length - 1]) {
          throw error;
        }
      }
    }

    const data = JSON.parse(response.text);

    if (!data.profileSummary || !data.topCareers) {
      return res.status(500).json({
        message: "Invalid career analysis received",
      });
    }

    res.json(data);
  } catch (error) {
    console.error("Career Analysis Error:", error);

    res.status(500).json({
      message: "Failed to analyze career profile",
    });
  }
};


const saveAssessment = async (req, res) => {
  try {
    const {
      currentStatus,
      stream,
      degree,
      branch,
      favoriteSubjects,
      strongSkills,
      hobbies,
      naturalStrengths,
      dreamCareer,
      questions,
      answers,
      analysis,
    } = req.body;

    if (!currentStatus || !questions || !answers || !analysis) {
      return res.status(400).json({
        message: "Assessment data is incomplete",
      });
    }

    if (!Array.isArray(questions) || !Array.isArray(answers)) {
      return res.status(400).json({
        message: "Questions and answers must be arrays",
      });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const assessmentsToday = await Assessment.countDocuments({
      userId: req.userId,
      createdAt: { $gte: startOfDay },
    });

    if (assessmentsToday >= 3) {
      return res.status(429).json({
        message: "You can complete only 3 assessments per day.",
      });
    }

    const assessment = await Assessment.create({
      userId: req.userId,

      profile: {
        currentStatus,
        stream: stream || "",
        degree: degree || "",
        branch: branch || "",
        favoriteSubjects: favoriteSubjects || "",
        strongSkills: strongSkills || [],
        hobbies: hobbies || "",
        naturalStrengths: naturalStrengths || "",
        dreamCareer: dreamCareer || "",
      },

      questions,
      answers,
      analysis,
    });

    res.status(201).json({
      message: "Assessment saved successfully",
      assessmentId: assessment._id,
    });
  } catch (error) {
    console.error("Save Assessment Error:", error);

    res.status(500).json({
      message: "Failed to save assessment",
    });
  }
};


module.exports = {
  generateCareerQuestions,
  analyzeCareerProfile,
  saveAssessment,
};




