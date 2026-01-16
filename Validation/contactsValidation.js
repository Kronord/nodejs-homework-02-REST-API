const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(4).max(25),
  phone: Joi.string().min(10),
});

const schemaPatch = Joi.object({
  favorite: Joi.bool(),
});

module.exports = { schema, schemaPatch };
