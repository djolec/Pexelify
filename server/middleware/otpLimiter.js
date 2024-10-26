const rateLimit = require("express-rate-limit");

const otpLimiter = rateLimit({
  windowMs: 2 * 60 * 1000,
  max: 1,
  keyGenerator: (req) => req.body.username,
  standardHeaders: true,
  legacyHeaders: false,
  skipFailedRequests: true,
  handler: (req, res) => {
    res.status(429).json({
      message: `Too many requests.`,
    });
  },
});

module.exports = otpLimiter;
