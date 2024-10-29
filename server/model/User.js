const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const photoSchema = new Schema({
  alt: String,
  avg_color: String,
  height: Number,
  width: Number,
  id: Number,
  src: String,
});

const videoSchema = new Schema({
  height: Number,
  width: Number,
  id: Number,
  image: String,
  src: String,
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  media: {
    photos: {
      type: [photoSchema],
      default: [],
    },
    videos: {
      type: [videoSchema],
      default: [],
    },
  },
  refreshToken: String,
  history: {
    type: [String],
    default: [],
  },
  resetPwdToken: String,
  verified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", userSchema);
