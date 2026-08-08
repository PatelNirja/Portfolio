const jwt = require("jsonwebtoken");

/**
 * Signs a JWT token with the given payload.
 * @param {Object} payload - Data to encode in the token.
 * @returns {string} Signed JWT string.
 */
const signToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT string to verify.
 * @returns {Object} Decoded payload.
 */
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

/**
 * Sets the JWT as an HTTP-only cookie on the response.
 * @param {Object} res - Express response object.
 * @param {string} token - Signed JWT string.
 */
const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in ms
  };
  res.cookie("token", token, cookieOptions);
};

/**
 * Clears the auth cookie from the response.
 * @param {Object} res - Express response object.
 */
const clearTokenCookie = (res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });
};

module.exports = { signToken, verifyToken, setTokenCookie, clearTokenCookie };
