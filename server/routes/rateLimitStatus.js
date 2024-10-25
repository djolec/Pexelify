const express = require("express");
const router = express.Router();
const rateLimitController = require("../controllers/rateLimitController");

router.route("/:username").get(rateLimitController.rateLimitStatus);

module.exports = router;
