const ApiError = require("../utils/ApiError");

/**
 * Validation middleware factory.
 * @param {Function} schema - A Joi schema with .validateAsync() method.
 * @param {string} source - Request property to validate: 'body' | 'query' | 'params'.
 */
const validate = (schema, source = "body") => {
  return async (req, res, next) => {
    try {
      const validated = await schema.validateAsync(req[source], {
        abortEarly: false,
        stripUnknown: true,
      });
      req[source] = validated;
      next();
    } catch (error) {
      if (error.isJoi) {
        const errors = error.details.map((detail) => ({
          field: detail.context.key,
          message: detail.message.replace(/['"]/g, ""),
        }));
        return next(new ApiError(422, "Validation failed", errors));
      }
      next(error);
    }
  };
};

module.exports = validate;
