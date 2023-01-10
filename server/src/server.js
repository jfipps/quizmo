const express = require("express");
const cors = require("cors");
const session = require("express-session");
const mongodbstore = require("connect-mongodb-session")(session);
const { Server } = require("http");
require("./db/mongoose");
const userRouter = require("./routers/UserRouter");
const quizRouter = require("./routers/QuizRouter");
const { NONAME } = require("dns");

const app = express();
const port = process.env.PORT || 5001;

// setting up mongodbstore
const mongoDBstore = new mongodbstore({
  uri: "mongodb://localhost:27017/quizmo-test",
  collection: "mySessions",
});

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
      maxAge: 360000000,
      secure: false,
    },
  })
);

// cors setup
const corsOptions = {
  origin: ["http://localhost:3000", "*"],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions));
app.set("trust proxy", 1);

// routers
app.use(userRouter);
app.use(quizRouter);

// generic response
app.get("/", (req, res) => {
  res.send("This is a response");
});

app.listen(port, () => {
  console.log("Server is up on port: " + port);
});
