const express = require("express");
const request = require("postman-request");
const Score = require("../models/quizscores");
const { Server } = require("http");
const { callbackify } = require("util");
const { sessionCheck } = require("../middleware/auth");
require("../db/mongoose");
const router = new express.Router();

router.post("/quizquestions", (req, res) => {
  const url = `https://the-trivia-api.com/api/questions?categories=${req.body.category}&limit=10&difficulty=${req.body.difficulty}`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      res.status(401).send(error);
    } else if (body.error) {
      res.status(401).send(body.error);
    } else {
      body.forEach((item) => {
        item.answers = [{ answer: item.correctAnswer, isCorrect: true }];
        item.incorrectAnswers.forEach((incorrect) => {
          item.answers.push({ answer: incorrect, isCorrect: false });
        });
      });
      console.log(body);
      res.send(body);
    }
  });
});

// writes score to DB
router.post("/addscore", sessionCheck, async (req, res) => {
  const score = new Score(req.body);
  try {
    await score.save();
    res.status(201).send({ score });
  } catch (e) {
    res.status(400).send(e);
  }
});

// get personal scores from DB
router.post("/getmyscores", sessionCheck, async (req, res) => {
  try {
    console.log(req.body);
    const myScores = await Score.find({ username: { $eq: req.body.username } });
    console.log(myScores);
    res.send(myScores);
  } catch (e) {
    res.status(500).send(e);
  }
});

// get all scores from DB
router.post("/getallscores", async (req, res) => {
  try {
    const allScores = await Score.find({});
    res.send(allScores);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
