/**
 * Standardized API Response class
 * Ensures all responses follow the same envelope pattern.
 */
class ApiResponse {
  constructor(statusCode, data, message = "Success", pagination = null) {
    this.statusCode = statusCode;
    this.success = statusCode < 400;
    this.message = message;
    this.data = data;
    if (pagination) {
      this.pagination = pagination;
    }
  }
}

module.exports = ApiResponse;
