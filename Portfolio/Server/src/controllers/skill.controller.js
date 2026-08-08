const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const skillService = require("../services/skill.service");

const listSkills = asyncHandler(async (req, res) => {
  const skills = await skillService.getSkills();
  res.status(200).json(new ApiResponse(200, { skills }, "Skills retrieved successfully"));
});

const addSkill = asyncHandler(async (req, res) => {
  const skill = await skillService.createSkill(req.body);
  res.status(201).json(new ApiResponse(201, { skill }, "Skill created successfully"));
});

const editSkill = asyncHandler(async (req, res) => {
  const skill = await skillService.updateSkill(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, { skill }, "Skill updated successfully"));
});

const removeSkill = asyncHandler(async (req, res) => {
  await skillService.deleteSkill(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Skill deleted successfully"));
});

module.exports = { listSkills, addSkill, editSkill, removeSkill };
