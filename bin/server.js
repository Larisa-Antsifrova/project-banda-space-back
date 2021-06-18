const path = require("path");
require("dotenv").config({
  path: path.join(__dirname, "../env"),
  debug: process.env.MONGO_CONNECTION_DEV,
});
const app = require("../app");
const db = require("../db/mongo-db");
const { Port } = require("../helpers/constants");

const PORT = process.env.PORT || Port.default;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}).catch((error) => {
  console.log(`Error: ${error.message}.`);
});
