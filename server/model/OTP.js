const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const otpSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  otpCode: { type: String, required: true },
  xpiresAt: { type: Date, required: true, index: { expires: 0 } },
});

module.exports = mongoose.model("OTP", otpSchema);
