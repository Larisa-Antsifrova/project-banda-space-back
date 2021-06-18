const mongoose = require("mongoose");
require("dotenv").config();

const MONGO_CONNECTION =
  process.env.NODE_ENV === "production"
    ? process.env.MONGO_CONNECTION_PROD
    : process.env.MONGO_CONNECTION_DEV;

const db = mongoose.connect(MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log("Mongoose: DB connection successful.");
});

mongoose.connection.on("error", (error) => {
  console.log(`Mongoose: Error DB connection: ${error.message}.`);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose: DB connection terminated.");
});

process.on("SIGINT", async () => {
  mongoose.connection.close(() => {
    console.log("App: DB connection terminated.");
    process.exit(1);
  });
});

module.exports = db;
