const express = require("express");
const request = require("postman-request");
const { Server } = require("http");
const { callbackify } = require("util");
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

module.exports = router;
