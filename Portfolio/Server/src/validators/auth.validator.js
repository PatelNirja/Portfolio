const Joi = require("joi");

const loginSchema = Joi.object({
  email: Joi.string().email().required().label("Email"),
  password: Joi.string().min(8).required().label("Password"),
});

module.exports = { loginSchema };
