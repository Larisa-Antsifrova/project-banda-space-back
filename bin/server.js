const app = require("../app");
const db = require("../db/mongo-db");
const { Port } = require("../helpers/constants");
require("dotenv").config();

const PORT = process.env.PORT || Port.default;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});

db.then(() => {
  console.log("Mongo DB connected.");
});
