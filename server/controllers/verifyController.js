const OTP = require("../model/OTP");
const User = require("../model/User");

const verifyEmail = async (req, res) => {
  const { otp } = req.body;
  if (!otp)
    return res.status(400).json({ error: "Verification code is required" });

  try {
    // find OTP record
    const otpRecord = await OTP.findOne({ otpCode: otp }).exec();
    if (!otpRecord) {
      return res.status(400).json({ error: "Invalid verification code" });
    }

    // check if the OTP has expired
    if (otpRecord.xpiresAt < Date.now()) {
      await OTP.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({ error: "Verification code has expired" });
    }

    // find the user by userId
    const foundUser = await User.findById(otpRecord.userId).exec();
    if (!foundUser) return res.status(404).json({ error: "User not found" });

    if (foundUser.verified)
      return res.status(400).json({
        error: "This user has already been verified.",
        verified: true,
      });

    // mark the user as verified
    await User.updateOne({ _id: foundUser._id }, { verified: true });

    // delete the OTP document after successful verification
    await OTP.deleteMany({ userId: foundUser._id });

    return res.status(200).json({ message: "Email successfully verified" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An internal error occurred" });
  }
};

module.exports = { verifyEmail };
