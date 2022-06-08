const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().alphanum().min(4).max(25),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
  phone: Joi.string().length(14),
});

const schemaPatch = Joi.object({
  favorite: Joi.bool(),
});

module.exports = { schema, schemaPatch };