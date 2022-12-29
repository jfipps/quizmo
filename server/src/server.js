const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongodbstore = require("connect-mongodb-session")(session);
const { Server } = require("http");
const User = require("./models/user");
const path = require("path");
const { auth, sessionCheck } = require("./middleware/auth");
require("./db/mongoose");
const userRouter = require("./routers/UserRouter");
const quizRouter = require("./routers/QuizRouter");

const app = express();
const port = process.env.PORT || 5001;

// setting up mongodbstore
const mongoDBstore = new mongodbstore({
  uri: "mongodb://localhost:27017/quizmo-test",
  collection: "mySessions",
});

const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.set("trust proxy", 1);

// session setup
app.use(
  session({
    secret: "secret123",
    name: "session-id",
    store: mongoDBstore,
    saveUninitialized: false,
    resave: false,
    cookie: {
      httpOnly: false,
      maxAge: 3600000,
    },
  })
);

// routers
app.use(userRouter);
app.use(quizRouter);

app.get("/", (req, res) => {
  res.send("This is a response");
});

app.get("/home", sessionCheck, async (req, res) => {
  try {
    res.status(200).send("Home page");
  } catch (e) {
    res.status(400).send(e);
  }
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});

// const jwt = require("jsonwebtoken");

// const myfunc = async () => {
//   const token = jwt.sign({ _id: "abc123" }, "thisisasecret", {
//     expiresIn: "7 days",
//   });
//   console.log(token);

//   const data = jwt.verify(token, "thisisasecret");
//   console.log(data);
// };

// myfunc();
