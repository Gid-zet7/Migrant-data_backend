var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logger");
const { logEvents } = require("./middleware/logger");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/databaseConnection");

var indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const dataRouter = require("./routes/data");
const questionsForm = require("./routes/questions");
const migrantInfoRouter = require("./routes/migrant");
var usersRouter = require("./routes/users");

var app = express();

connectDB();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/data", dataRouter);
app.use("/questions", questionsForm);
app.use("/migrants", migrantInfoRouter);
app.use("/users", usersRouter);

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 not Found");
  }
});

const PORT = 8080;

mongoose.connection.once("open", () => {
  console.log("connected to mongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on("error", (err) => {
  console.log(err);
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrorLog.log"
  );
});

module.exports = app;
