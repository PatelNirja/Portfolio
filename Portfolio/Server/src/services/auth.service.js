const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const { signToken } = require("../utils/jwtUtils");

/**
 * Authenticates a user with email and password.
 * @param {string} email
 * @param {string} password
 * @returns {{ user: Object, token: string }}
 */
const loginUser = async (email, password) => {
  // Include password field explicitly (it's select: false)
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password.");
  }

  const token = signToken({ id: user._id, role: user.role });

  // Return user without password
  const userWithoutPassword = { _id: user._id, email: user.email, role: user.role };
  return { user: userWithoutPassword, token };
};

/**
 * Retrieves the currently authenticated user by ID.
 * @param {string} userId
 * @returns {Object} User document
 */
const getCurrentUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found.");
  }
  return user;
};

module.exports = { loginUser, getCurrentUser };
