const Education = require("../models/Education.model");
const ApiError = require("../utils/ApiError");

const getEducations = async () => {
  return await Education.find().sort({ order: 1, startDate: -1 });
};

const createEducation = async (data) => {
  return await Education.create(data);
};

const updateEducation = async (id, data) => {
  const education = await Education.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!education) throw new ApiError(404, "Education not found.");
  return education;
};

const deleteEducation = async (id) => {
  const education = await Education.findByIdAndDelete(id);
  if (!education) throw new ApiError(404, "Education not found.");
  return education;
};

module.exports = { getEducations, createEducation, updateEducation, deleteEducation };
