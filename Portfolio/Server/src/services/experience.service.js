const Experience = require("../models/Experience.model");
const ApiError = require("../utils/ApiError");

const getExperiences = async () => {
  return await Experience.find().sort({ order: 1, startDate: -1 });
};

const createExperience = async (data) => {
  return await Experience.create(data);
};

const updateExperience = async (id, data) => {
  const experience = await Experience.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!experience) throw new ApiError(404, "Experience not found.");
  return experience;
};

const deleteExperience = async (id) => {
  const experience = await Experience.findByIdAndDelete(id);
  if (!experience) throw new ApiError(404, "Experience not found.");
  return experience;
};

module.exports = { getExperiences, createExperience, updateExperience, deleteExperience };
