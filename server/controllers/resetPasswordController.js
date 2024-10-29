const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const handleResetPassword = async (req, res) => {
  const { password, resetToken } = req.body;

  if (!password || !resetToken)
    return res
      .status(400)
      .json({ error: "Password and reset token are required" });

  try {
    // Verify reset token
    const decoded = jwt.verify(resetToken, process.env.RESET_TOKEN_SECRET);
    const userId = decoded.id;

    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (foundUser.resetPwdToken !== resetToken) {
      return res.status(401).json({ error: "Invalid password reset token" });
    }

    // Encrypt the new password
    const hashedPwd = await bcrypt.hash(password, 10);
    foundUser.password = hashedPwd;

    // Clear reset token after password change
    foundUser.resetPwdToken = "";
    await foundUser.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error("Error in handleResetPassword:", err);
    res.status(403).json({
      error: "Password reset token is either invalid or has expired",
    });
  }
};

module.exports = { handleResetPassword };
