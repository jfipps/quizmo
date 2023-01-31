const mongoose = require("mongoose");
const bs = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const quizScoreSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    difficulty: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    score: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Score = mongoose.model("Score", quizScoreSchema);

module.exports = Score;
