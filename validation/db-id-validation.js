const mongoose = require("mongoose");
const { HttpCodes } = require("../helpers/constants");

const validateMongoId = (req, res, next) => {
  const id = req.params.entryId;
  const isValid = mongoose.isValidObjectId(id);

  if (!isValid) {
    return res.status(HttpCodes.BAD_REQUEST).json({
      status: HttpCodes.BAD_REQUEST,
      message: "Invalid id.",
    });
  }

  next();
};

module.exports = validateMongoId;
