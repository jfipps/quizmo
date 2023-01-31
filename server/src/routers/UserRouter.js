const express = require("express");
const { Server } = require("http");
const User = require("../models/user");
const path = require("path");
const { sessionCheck } = require("../middleware/auth");
require("../db/mongoose");
const router = new express.Router();

// test route for having a session
router.get("/users/me", sessionCheck, async (req, res) => {
  res.send(req.user);
});

// route to set user session on login if creds valid
router.post("/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );

    req.session.user = user.getPublicInfo();

    res.send({ user: req.session.user });
  } catch (e) {
    res.status(400).send(e);
  }
});

// route to create a user if criteria met
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

// deletes current user session
router.get("/users/logout", sessionCheck, async (req, res) => {
  try {
    delete req.session.user;
    res.send(req.session);
  } catch (e) {
    res.status(500).send(e);
  }
});

// test route for session check
router.get("/users", sessionCheck, async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

// helper route to check user authentication. returns to front end
router.get("/isAuth", (req, res) => {
  if (req.session.user) {
    console.log(req.session.user);
    res.json({ user: req.session.user, loggedIn: true });
  } else {
    console.log("No User");
    res.json({ user: req.session.user, loggedIn: false });
  }
});

module.exports = router;
