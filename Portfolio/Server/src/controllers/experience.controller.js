const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const experienceService = require("../services/experience.service");

const listExperiences = asyncHandler(async (req, res) => {
  const experiences = await experienceService.getExperiences();
  res.status(200).json(new ApiResponse(200, { experiences }, "Experiences retrieved successfully"));
});

const addExperience = asyncHandler(async (req, res) => {
  const experience = await experienceService.createExperience(req.body);
  res.status(201).json(new ApiResponse(201, { experience }, "Experience created successfully"));
});

const editExperience = asyncHandler(async (req, res) => {
  const experience = await experienceService.updateExperience(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, { experience }, "Experience updated successfully"));
});

const removeExperience = asyncHandler(async (req, res) => {
  await experienceService.deleteExperience(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Experience deleted successfully"));
});

module.exports = { listExperiences, addExperience, editExperience, removeExperience };
