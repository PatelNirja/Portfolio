const Joi = require("joi");

const createSkillSchema = Joi.object({
  name: Joi.string().max(50).optional().allow("").label("Skill Name"),
  category: Joi.string().valid("frontend", "backend", "devops", "database", "tools", "other").optional().label("Category"),
  proficiency: Joi.number().min(0).max(100).optional().label("Proficiency"),
  icon: Joi.string().optional().allow("").label("Icon"),
  order: Joi.number().optional().label("Order"),
});

const updateSkillSchema = createSkillSchema.fork(["name"], (schema) => schema.optional());

module.exports = { createSkillSchema, updateSkillSchema };
