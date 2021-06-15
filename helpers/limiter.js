const { HttpCodes, Statuses } = require("./constants");
require("dotenv").config();

const Limiter = {
  JSON: process.env.JSON_LIMIT,
  rateLimit: {
    windowMs: process.env.TIME_LIMIT,
    max: process.env.MAX_REQUESTS_LIMIT,
    handler: (req, res, next) => {
      return res.status(HttpCodes.TOO_MANY_REQUESTS).json({
        status: Statuses.error,
        code: HttpCodes.TOO_MANY_REQUESTS,
        message: "Too many requrests made. Please try again later.",
      });
    },
  },
};

module.exports = { Limiter };
