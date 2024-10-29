const express = require("express");
const router = express.Router();
const sendPasswordResetController = require("../controllers/sendPasswordResetController");

router.route("/").post(sendPasswordResetController.handleSendPasswordReset);

module.exports = router;
