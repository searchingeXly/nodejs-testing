const express = require("express");
const app = express();
const morgan = require("morgan");
const logger = require("./logger");
const authorize = require("./authorize");

// req => middleware => res
// app.use([logger, authorize]);
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("Home");
});
app.get("/about", (req, res) => {
  res.send("About");
});
app.get("/api", (req, res) => {
  res.send("API");
});

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(8000, () => {
  console.log("server is listening on port 8000");
});
