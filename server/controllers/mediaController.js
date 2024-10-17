const User = require("../model/User");

const getUserMedia = async (req, res) => {
  const { id } = req;

  if (!id) return res.status(400).json({ error: "User ID is required." });

  try {
    const foundUser = await User.findById(id).select("media");

    if (!foundUser) return res.status(404).json({ error: "User not found." });

    res.status(200).json(foundUser.media);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user photos and videos." });
  }
};

const addPhoto = async (req, res) => {
  const { id } = req;
  const { newPhoto } = req.body;

  if (!newPhoto) return res.status(400).json({ error: "Invalid photo data" });
  if (!id) return res.status(400).json({ error: "User ID is required" });

  try {
    const foundUser = await User.findByIdAndUpdate(
      id,
      { $push: { "media.photos": newPhoto } },
      { new: true }
    );

    if (!foundUser) return res.status(404).json({ error: "User not found" });

    const addedPhoto =
      foundUser.media.photos[foundUser.media.photos.length - 1];

    res.status(200).json({
      message: "Photo added successfully",
      data: addedPhoto,
    });
  } catch (err) {
    res.status(500).json({ error: "Error adding photo" });
  }
};

const deletePhoto = async (req, res) => {
  const { id } = req;
  const { photoId } = req.body;

  if (!id || !photoId)
    return res
      .status(400)
      .json({ error: "User ID and photo ID are required." });

  try {
    const foundUser = await User.findByIdAndUpdate(
      id,
      { $pull: { "media.photos": { _id: photoId } } },
      { new: true }
    );

    if (!foundUser) return res.status(404).json({ error: "User not found." });

    res.status(200).json({
      message: "Photo deleted successfully.",
      data: photoId,
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting photo." });
  }
};

const addVideo = async (req, res) => {
  const { id } = req;
  const { newVideo } = req.body;

  if (!id) return res.status(400).json({ error: "User ID is required" });

  try {
    const foundUser = await User.findByIdAndUpdate(
      id,
      { $push: { "media.videos": newVideo } },
      { new: true }
    );

    if (!foundUser) return res.status(404).json({ error: "User not found" });

    const addedVideo =
      foundUser.media.videos[foundUser.media.videos.length - 1];

    res.status(200).json({
      message: "Video added successfully",
      data: addedVideo,
    });
  } catch (err) {
    res.status(500).json({ error: "Error adding video" });
  }
};

const deleteVideo = async (req, res) => {
  const { id } = req;
  const { videoId } = req.body;

  if (!id || !videoId)
    return res
      .status(400)
      .json({ error: "User ID and video ID are required." });

  try {
    const foundUser = await User.findByIdAndUpdate(
      id,
      { $pull: { "media.videos": { _id: videoId } } },
      { new: true }
    );

    if (!foundUser) return res.status(404).json({ error: "User not found." });

    res.status(200).json({
      message: "Video deleted successfully.",
      data: videoId,
    });
  } catch (err) {
    res.status(500).json({ error: "Error deleting video." });
  }
};

module.exports = {
  addPhoto,
  deletePhoto,
  addVideo,
  deleteVideo,
  getUserMedia,
};
