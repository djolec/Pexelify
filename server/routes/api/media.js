const express = require("express");
const router = express.Router();
const mediaController = require("../../controllers/mediaController");

router
  .route("/photos")
  .post(mediaController.addPhoto)
  .delete(mediaController.deletePhoto);

router
  .route("/videos")
  .post(mediaController.addVideo)
  .delete(mediaController.deleteVideo);

router.route("/").get(mediaController.getUserMedia);

module.exports = router;
