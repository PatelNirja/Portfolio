const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().optional().allow("").label("Email"),
  password: Joi.string().optional().allow("").label("Password"),
});

module.exports = { loginSchema };
