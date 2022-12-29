const express = require("express");
const request = require("postman-request");
const { Server } = require("http");
const { callbackify } = require("util");
require("../db/mongoose");
const router = new express.Router();

router.get("/quizquestions", (req, res) => {
  const url =
    "https://the-trivia-api.com/api/questions?categories=general_knowledge&limit=10&difficulty=medium";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      res.status(401).send(error);
    } else if (body.error) {
      res.status(401).send(body.error);
    } else {
      res.send(body);
    }
  });
});

module.exports = router;
