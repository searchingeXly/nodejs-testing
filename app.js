const express = require("express");
const app = express();

const peopleRouter = require("./routes/people");
const authRouter = require("./routes/auth");

app.use(express.static("./methods-public"));
//parse form data
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());
// assign routes
app.use("/api/people", peopleRouter);
app.use("/login", authRouter);

app.all("*", (req, res) => {
  res.status(404).send("resource not found");
});

app.listen(8000, () => {
  console.log("server is listening on port 8000");
});
