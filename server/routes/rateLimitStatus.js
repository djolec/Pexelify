const express = require("express");
const router = express.Router();
const rateLimitController = require("../controllers/rateLimitController");
const {
  otpLimiter,
  passwordResetEmailLimiter,
} = require("../middleware/rateLimit");

router
  .route("/otp/:key")
  .get((req, res) =>
    rateLimitController.handleRateLimiter(req, res, otpLimiter)
  );
router
  .route("/password-reset/:key")
  .get((req, res) =>
    rateLimitController.handleRateLimiter(req, res, passwordResetEmailLimiter)
  );

module.exports = router;
