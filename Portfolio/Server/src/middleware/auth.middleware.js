const { verifyToken } = require("../utils/jwtUtils");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User.model");

/**
 * Auth middleware — verifies JWT from HTTP-only cookie.
 * Attaches the authenticated user to req.user.
 */
const authMiddleware = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    throw new ApiError(401, "Authentication required. Please login.");
  }

  const decoded = verifyToken(token);

  const user = await User.findById(decoded.id).select("-password");
  if (!user) {
    throw new ApiError(401, "User not found. Please login again.");
  }

  req.user = user;
  next();
});

module.exports = authMiddleware;
