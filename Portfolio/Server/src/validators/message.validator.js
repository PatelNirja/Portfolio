const Joi = require("joi");

const messageSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().label("Name"),
  email: Joi.string().email().required().label("Email"),
  subject: Joi.string().max(200).optional().allow("").label("Subject"),
  message: Joi.string().min(10).max(2000).required().label("Message"),
});

module.exports = { messageSchema };
