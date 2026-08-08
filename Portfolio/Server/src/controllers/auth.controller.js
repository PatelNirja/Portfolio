const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const { loginUser, getCurrentUser } = require("../services/auth.service");
const { setTokenCookie, clearTokenCookie } = require("../utils/jwtUtils");

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginUser(email, password);
  setTokenCookie(res, token);
  res.status(200).json(new ApiResponse(200, { user }, "Login successful"));
});

const logout = asyncHandler(async (req, res) => {
  clearTokenCookie(res);
  res.status(200).json(new ApiResponse(200, null, "Logged out successfully"));
});

const getMe = asyncHandler(async (req, res) => {
  const user = await getCurrentUser(req.user._id);
  res.status(200).json(new ApiResponse(200, { user }, "User retrieved"));
});

module.exports = { login, logout, getMe };
