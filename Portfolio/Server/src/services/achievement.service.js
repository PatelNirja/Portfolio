const Achievement = require("../models/Achievement.model");
const ApiError = require("../utils/ApiError");

const getAchievements = async () => {
  return await Achievement.find().sort({ order: 1, date: -1 });
};

const createAchievement = async (data) => {
  return await Achievement.create(data);
};

const updateAchievement = async (id, data) => {
  const achievement = await Achievement.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!achievement) throw new ApiError(404, "Achievement not found.");
  return achievement;
};

const deleteAchievement = async (id) => {
  const achievement = await Achievement.findByIdAndDelete(id);
  if (!achievement) throw new ApiError(404, "Achievement not found.");
  return achievement;
};

module.exports = { getAchievements, createAchievement, updateAchievement, deleteAchievement };
