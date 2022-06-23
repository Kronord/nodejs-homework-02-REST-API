const Joi = require("joi");

const newLocal = "^[a-zA-Z0-9]{3,30}$";

const schema = Joi.object({
  password: Joi.string().pattern(new RegExp(newLocal)),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }),
});

const updateSchema = Joi.object({
  subscription: Joi.any().valid("starter", "pro", "business").required(),
});

module.exports = { schema, updateSchema };
