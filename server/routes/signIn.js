const express = require("express");
const router = express.Router();
const signInController = require("../controllers/signInController");

router.route("/").post(signInController.handleSignIn);

module.exports = router;
