const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { HttpCodes, Statuses } = require("./helpers/constants");
const entriesRouter = require("./routes/entries-router");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/entries", entriesRouter);

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
