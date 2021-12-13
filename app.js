const express = require("express");
const app = express();

// req => middleware => res

const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  next();
};

app.get("/", logger, (req, res) => {
  res.send("Home");
});

app.all("*", logger, (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(8000, () => {
  console.log("server is listening on port 8000");
});
