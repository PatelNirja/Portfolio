const Joi = require("joi");

const createProjectSchema = Joi.object({
  title: Joi.string().max(100).optional().allow("").label("Title"),
  shortDesc: Joi.string().max(300).optional().allow("").label("Short Description"),
  description: Joi.string().optional().allow("").label("Description"),
  thumbnail: Joi.string().uri().optional().allow("").label("Thumbnail"),
  thumbnailPublicId: Joi.string().optional().allow("").label("Thumbnail Public ID"),
  images: Joi.array().items(Joi.string().uri()).optional().label("Images"),
  imagePublicIds: Joi.array().items(Joi.string()).optional().label("Image Public IDs"),
  tags: Joi.array().items(Joi.string()).optional().label("Tags"),
  category: Joi.string().valid("web", "mobile", "ai", "other").optional().label("Category"),
  techStack: Joi.array().items(Joi.string()).optional().label("Tech Stack"),
  liveUrl: Joi.string().uri().optional().allow("").label("Live URL"),
  githubUrl: Joi.string().uri().optional().allow("").label("GitHub URL"),
  isFeatured: Joi.boolean().optional().label("Featured"),
  order: Joi.number().optional().label("Order"),
  status: Joi.string().valid("draft", "published").optional().label("Status"),
});

const updateProjectSchema = createProjectSchema.fork(["title"], (schema) => schema.optional());

module.exports = { createProjectSchema, updateProjectSchema };
