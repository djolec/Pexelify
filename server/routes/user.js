const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.route("/").post(userController.createNewUser);

router.route("/").delete(userController.deleteUser);

module.exports = router;
