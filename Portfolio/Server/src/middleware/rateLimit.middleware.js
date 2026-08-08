const rateLimit = require("express-rate-limit");

/**
 * General API rate limiter — 100 requests per 15 minutes per IP.
 */
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many requests. Please try again after 15 minutes.",
  },
});

/**
 * Auth rate limiter — 10 login attempts per 15 minutes per IP.
 */
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes.",
  },
});

/**
 * Contact form limiter — 5 submissions per hour per IP.
 */
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages sent. Please try again after an hour.",
  },
});

module.exports = { generalLimiter, authLimiter, contactLimiter };
