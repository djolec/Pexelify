const rateLimit = require("express-rate-limit");

const otpLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1,
  keyGenerator: (req) => req.body.username,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  handler: (_req, res) => {
    res.status(429).json({
      error: `Too many requests`,
    });
  },
});

const passwordResetEmailLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1,
  keyGenerator: (req) => req.body.username,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  handler: (_req, res) => {
    res.status(429).json({
      error: `One password change is allowed per hour`,
    });
  },
});

module.exports = { otpLimiter, passwordResetEmailLimiter };
