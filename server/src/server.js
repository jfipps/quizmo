const express = require("express");
const { Server } = require("http");
const path = require("path");

const app = express();
const port = process.env.PORT || 5001;

app.get("/", (req, res) => {
  res.send("This is a response");
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
