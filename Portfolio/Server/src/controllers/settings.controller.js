const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const settingsService = require("../services/settings.service");

const fetchSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.getSettings();
  res.status(200).json(new ApiResponse(200, { settings }, "Settings retrieved successfully"));
});

const editSettings = asyncHandler(async (req, res) => {
  const settings = await settingsService.updateSettings(req.body);
  res.status(200).json(new ApiResponse(200, { settings }, "Settings updated successfully"));
});

module.exports = { fetchSettings, editSettings };
