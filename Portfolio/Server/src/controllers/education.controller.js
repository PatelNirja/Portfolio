const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const educationService = require("../services/education.service");

const listEducations = asyncHandler(async (req, res) => {
  const educations = await educationService.getEducations();
  res.status(200).json(new ApiResponse(200, { educations }, "Education list retrieved successfully"));
});

const addEducation = asyncHandler(async (req, res) => {
  const education = await educationService.createEducation(req.body);
  res.status(201).json(new ApiResponse(201, { education }, "Education created successfully"));
});

const editEducation = asyncHandler(async (req, res) => {
  const education = await educationService.updateEducation(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, { education }, "Education updated successfully"));
});

const removeEducation = asyncHandler(async (req, res) => {
  await educationService.deleteEducation(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Education deleted successfully"));
});

module.exports = { listEducations, addEducation, editEducation, removeEducation };
