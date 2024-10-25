const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleSignIn = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  try {
    const foundUser = await User.findOne({ username }).exec();
    if (!foundUser) return res.status(401).json({ error: "User not found" });

    const match = await bcrypt.compare(password, foundUser.password);

    // check if user is verified
    if (match && !foundUser.verified)
      return res.status(401).json({
        error: "Email address has not been verified",
        verified: foundUser.verified,
      });

    // create JWT tokens
    if (match) {
      const accessToken = jwt.sign(
        { id: foundUser._id },

        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "10m",
        }
      );

      const refreshToken = jwt.sign(
        { username: foundUser.username },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "1d",
        }
      );

      // saving refreshToken with current user
      foundUser.refreshToken = refreshToken;
      await foundUser.save();

      res.cookie("jwt", refreshToken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "None",
        secure: true,
      });

      return res.status(200).json({
        accessToken,
        media: foundUser.media,
        history: foundUser.history,
      });
    } else {
      return res.status(401).json({ error: "Wrong password" });
    }
  } catch (err) {
    res.status(500).json({ error: "There was a problem with the server" });
  }
};

module.exports = { handleSignIn };
