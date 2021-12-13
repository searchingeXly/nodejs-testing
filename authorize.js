const authorize = (req, res, next) => {
  const { user } = req.query;
  if (user === "fabio") {
    req.user = { name: "fabio", id: 3 };
    console.log(`authorize ${user}`);
    next();
  } else {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = authorize;
