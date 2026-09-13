
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");



const careerRoutes = require("./routes/careerRoutes");
const authRoutes = require("./routes/authRoutes");



const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: {
    message: "Too many requests. Please try again later.",
  },
});



app.get("/", (req, res) => {
  res.json({
    message: "NextStep AI Backend is running",
  });
});


app.use("/api/career/questions", aiLimiter);
app.use("/api/career/analyze", aiLimiter);


app.use("/api/career", careerRoutes);
app.use("/api/auth", authRoutes);


module.exports = app;

