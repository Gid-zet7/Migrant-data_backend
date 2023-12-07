var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
const { logger } = require("./middleware/logger");
const { logEvents } = require("./middleware/logger");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");

var indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const migrantDataRouter = require("./routes/migrantData");
const migrantInfoRouter = require("./routes/migrant");
var usersRouter = require("./routes/users");

var app = express();

app.use(logger);
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/data", migrantDataRouter);
app.use("/migrant", migrantInfoRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
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
