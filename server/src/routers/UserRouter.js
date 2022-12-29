const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const { Server } = require("http");
const User = require("../models/user");
const path = require("path");
const { auth, sessionCheck } = require("../middleware/auth");
require("../db/mongoose");
const router = new express.Router();

router.get("/users/me", sessionCheck, async (req, res) => {
  res.send(req.user);
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );

    req.session.user = user.getPublicInfo();

    //const token = await user.generateAuthToken();

    res.send({ user: req.session.user });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();

    req.session.user = user.getPublicInfo();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/logout", sessionCheck, async (req, res) => {
  try {
    delete req.session.user;
    res.send(req.session);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users", sessionCheck, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/isAuth", async (req, res) => {
  console.log("Auth Check");
  if (req.session.user) {
    res.json(req.session.user);
  } else {
    res.status(401).json("Unauthorized");
  }
});

module.exports = router;
