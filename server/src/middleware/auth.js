// middleware function to check if user has an active session
const sessionCheck = (req, res, next) => {
  console.log(req.session);
  const { user } = req.session;
  if (!user) {
    return res.status(401).send(req.session);
  }
  next();
};

module.exports = { sessionCheck };
