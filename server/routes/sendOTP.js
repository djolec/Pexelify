const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otpController");

router.route("/").post(otpController.sendOTP);

module.exports = router;
