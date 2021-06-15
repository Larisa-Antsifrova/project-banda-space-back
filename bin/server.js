const app = require("../app");
const db = require("../db/mongo-db");
const { Port } = require("../helpers/constants");
require("dotenv").config();

const PORT = process.env.PORT || Port.default;

db.then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
  });
}).catch((error) => {
  console.log(`Error: ${error.message}.`);
});
