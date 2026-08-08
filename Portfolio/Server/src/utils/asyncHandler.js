/**
 * asyncHandler — wraps async controller functions to eliminate try/catch boilerplate.
 * Any unhandled promise rejection is forwarded to Express error middleware via next().
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
