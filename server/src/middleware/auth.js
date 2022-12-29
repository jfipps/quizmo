const jwt = require("jsonwebtoken");
const User = require("../models/user");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisisasecret");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate" });
  }
};

const sessionCheck = (req, res, next) => {
  const { user } = req.session;
  if (!user) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  next();
};

module.exports = { auth, sessionCheck };
