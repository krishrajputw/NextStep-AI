
const mongoose = require("mongoose");

const assessmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    profile: {
      currentStatus: {
        type: String,
        required: true,
      },

      stream: {
        type: String,
        default: "",
      },

      degree: {
        type: String,
        default: "",
      },

      branch: {
        type: String,
        default: "",
      },

      favoriteSubjects: {
        type: String,
        default: "",
      },

      strongSkills: {
        type: [String],
        default: [],
      },

      hobbies: {
        type: String,
        default: "",
      },

      naturalStrengths: {
        type: String,
        default: "",
      },

      dreamCareer: {
        type: String,
        default: "",
      },
    },

    questions: {
      type: Array,
      required: true,
    },

    answers: {
      type: Array,
      required: true,
    },

    analysis: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Assessment", assessmentSchema);

