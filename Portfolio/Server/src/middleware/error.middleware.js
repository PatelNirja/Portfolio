const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

/**
 * Global error handling middleware.
 * Catches all errors forwarded via next(error) and returns a consistent JSON response.
 */
const errorMiddleware = (err, req, res, next) => {
  let error = err;

  // If error is not an ApiError, wrap it
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, error.errors || []);
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new ApiError(409, `Duplicate value: ${field} already exists.`);
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));
    error = new ApiError(400, "Validation Error", messages);
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    error = new ApiError(401, "Invalid token. Please login again.");
  }
  if (err.name === "TokenExpiredError") {
    error = new ApiError(401, "Token expired. Please login again.");
  }

  const response = {
    success: false,
    message: error.message,
    errors: error.errors,
    ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
  };

  return res.status(error.statusCode || 500).json(response);
};

module.exports = errorMiddleware;
