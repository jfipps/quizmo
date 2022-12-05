const express = require("express");
const { Server } = require("http");
const path = require("path");

const app = express();
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("This is a response");
});

app.get("/login", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.send({ msg: "Quizmo" });
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
