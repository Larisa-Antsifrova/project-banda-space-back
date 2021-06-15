const Joi = require("joi");
const { HttpCodes } = require("../helpers/constants");
const { Authors } = require("../helpers/authors");

const validateAddEntry = Joi.object({
  word: Joi.string().trim().min(2).max(50).required(),
  description: Joi.string().min(2).max(200).required(),
  author: Joi.string()
    .valid(...Authors)
    .required(),
});

const validateEditEntry = Joi.object({
  word: Joi.string().trim().min(2).max(50).optional(),
  description: Joi.string().min(2).max(200).optional(),
  author: Joi.string()
    .valid(...Authors)
    .optional(),
}).or("word", "description", "author");

const validate = async (schema, request, next) => {
  try {
    await schema.validateAsync(request);
    next();
  } catch (error) {
    next({
      status: HttpCodes.BAD_REQUEST,
      message: error.message.replace(/"/g, ""),
    });
  }
};

module.exports = {
  validateAddEntry: (req, res, next) => {
    return validate(validateAddEntry, req.body, next);
  },
  validateEditEntry: (req, res, next) => {
    return validate(validateEditEntry, req.body, next);
  },
};
