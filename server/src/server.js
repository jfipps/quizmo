const express = require("express");
const cors = require("cors");
const { Server } = require("http");
const User = require("./models/user");
const path = require("path");
require("./db/mongoose");

const app = express();
const port = process.env.PORT || 5001;

const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("This is a response");
});

app.get("/login", (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  console.log(req.query.username);
  console.log(req.query.password);
  res.send({ msg: "Received" });
});

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send({ user });
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
