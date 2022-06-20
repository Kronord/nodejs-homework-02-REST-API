const { createError, errorOrResponce } = require("../error");

const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { presence: "required" });
    if (error) {
      throw createError(
        400,
        errorOrResponce(
          "400 Bad Request",
          error.details[0].type === "any.required"
            ? `missing required ${error.details[0].path[0]} field`
            : error.message
        )
      );
    }
    next();
  };
};

module.exports = {
  validateRequest,
};
