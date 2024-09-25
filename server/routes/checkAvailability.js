const express = require("express");
const router = express.Router();
const availabilityController = require("../controllers/availabilityController");

router.route("/").post(availabilityController.checkAvailability);

module.exports = router;
