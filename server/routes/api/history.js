const express = require("express");
const router = express.Router();
const historyController = require("../../controllers/historyController");

router.route("/").put(historyController.updateHistory);

module.exports = router;
