const Skill = require("../models/Skill.model");
const ApiError = require("../utils/ApiError");

const getSkills = async () => {
  return await Skill.find().sort({ order: 1, createdAt: 1 });
};

const createSkill = async (data) => {
  return await Skill.create(data);
};

const updateSkill = async (id, data) => {
  const skill = await Skill.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!skill) throw new ApiError(404, "Skill not found.");
  return skill;
};

const deleteSkill = async (id) => {
  const skill = await Skill.findByIdAndDelete(id);
  if (!skill) throw new ApiError(404, "Skill not found.");
  return skill;
};

module.exports = { getSkills, createSkill, updateSkill, deleteSkill };
