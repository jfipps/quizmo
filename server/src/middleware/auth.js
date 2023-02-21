// middleware function to check if user has an active session
const sessionCheck = (req, res, next) => {
  const { user } = req.session;
  console.log(user);
  if (!user) {
    console.log("Fail");
    return res.status(401).send(req.session);
  }
  next();
};

module.exports = { sessionCheck };
