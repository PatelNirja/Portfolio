const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { getProfile, updateProfile } = require("../services/profile.service");

const fetchProfile = asyncHandler(async (req, res) => {
  const profile = await getProfile();
  res.status(200).json(new ApiResponse(200, { profile }, "Profile retrieved"));
});

const editProfile = asyncHandler(async (req, res) => {
  const profile = await updateProfile(req.body);
  res.status(200).json(new ApiResponse(200, { profile }, "Profile updated successfully"));
});

module.exports = { fetchProfile, editProfile };
