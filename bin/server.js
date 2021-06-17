const app = require("../app");
const { Port } = require("../helpers/constants");
require("dotenv").config();

const PORT = process.env.PORT || Port.default;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
