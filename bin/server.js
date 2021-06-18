const app = require("../app");
const db = require("../db/mongo-db");
const { Port } = require("../helpers/constants");
require("dotenv").config();

const PORT = process.env.PORT || Port.default;

app.listen(PORT, async () => {
  await db;
  console.log(`Server running on port: ${PORT}`);
});
