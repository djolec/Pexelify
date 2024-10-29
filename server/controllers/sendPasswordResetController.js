const User = require("../model/User");
const jwt = require("jsonwebtoken");
const sendResetLink = require("../utils/sendResetLink");

const handleSendPasswordReset = async (req, res) => {
  const { username } = req.body;
  console.log(username);

  if (!username) return res.status(400).json({ error: "Username is required" });

  try {
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser)
      return res.status(200).json({
        message: "If the username exists a password reset link will be sent",
      });

    // Create password reset token
    const resetPwdToken = jwt.sign(
      { id: foundUser._id },
      process.env.RESET_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    // Save token with current user
    foundUser.resetPwdToken = resetPwdToken;
    await foundUser.save();

    await sendResetLink(foundUser, foundUser.resetPwdToken);

    res.status(200).json({
      message: "If the username exists a password reset link will be sent",
    });
  } catch (err) {
    console.error("Error in handleResetPassword:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { handleSendPasswordReset };
