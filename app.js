const express = require("express");
const helmet = require("helmet");
const logger = require("morgan");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const boolParser = require("express-query-boolean");
const entriesRouter = require("./routes/entries-router");
const { HttpCodes, Statuses } = require("./helpers/constants");
const { Limiter } = require("./helpers/limiter");

const app = express();
app.use(helmet());

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json({ limit: Limiter.JSON }));
app.use(boolParser());

app.use("/entries", rateLimit(Limiter.rateLimit), entriesRouter);

app.use((req, res) => {
  res.status(HttpCodes.NOT_FOUND).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const statusCode = err.status || HttpCodes.INTERNAL_SERVER_ERROR;

  res.status(statusCode).json({
    status:
      statusCode === HttpCodes.INTERNAL_SERVER_ERROR
        ? Statuses.fail
        : Statuses.error,
    code: statusCode,
    message: err.message,
  });
});

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
});

module.exports = app;
