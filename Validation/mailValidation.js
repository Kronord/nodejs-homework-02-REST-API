const Joi = require("joi");

const schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net", "ua"] },
  }).required(),
});

module.exports = { schema };
