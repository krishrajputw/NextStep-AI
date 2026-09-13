const express = require("express");
const jwt = require("jsonwebtoken");

const careerController = require("../controllers/careerController");

const router = express.Router();

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

router.post(
  "/questions",
  careerController.generateCareerQuestions
);

router.post(
  "/analyze",
  careerController.analyzeCareerProfile
);

router.post(
  "/save",
  authMiddleware,
  careerController.saveAssessment
);

module.exports = router;