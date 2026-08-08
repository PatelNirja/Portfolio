const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const achievementService = require("../services/achievement.service");

const listAchievements = asyncHandler(async (req, res) => {
  const achievements = await achievementService.getAchievements();
  res.status(200).json(new ApiResponse(200, { achievements }, "Achievements retrieved successfully"));
});

const addAchievement = asyncHandler(async (req, res) => {
  const achievement = await achievementService.createAchievement(req.body);
  res.status(201).json(new ApiResponse(201, { achievement }, "Achievement created successfully"));
});

const editAchievement = asyncHandler(async (req, res) => {
  const achievement = await achievementService.updateAchievement(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, { achievement }, "Achievement updated successfully"));
});

const removeAchievement = asyncHandler(async (req, res) => {
  await achievementService.deleteAchievement(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Achievement deleted successfully"));
});

module.exports = { listAchievements, addAchievement, editAchievement, removeAchievement };
