const User = require("../model/User");
const sendEmail = require("../utils/sendEmail");
const saveOTP = require("../utils/otpService");

const sendOTP = async (req, res) => {
  const { username } = req.body;

  // validate username presence
  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    const foundUser = await User.findOne({ username }).exec();

    if (!foundUser) return res.status(401).json({ error: "User not found" });

    // check if the user is already verified
    if (foundUser.verified)
      return res
        .status(400)
        .json({ error: "This user has already been verified" });

    // create, save and send OTP
    const otpCode = await saveOTP(foundUser);
    await sendEmail(foundUser.username, otpCode);

    res.status(200).json({
      success: `Verification code has been sent to ${foundUser.username}.`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "An internal error occurred" });
  }
};

module.exports = { sendOTP };
