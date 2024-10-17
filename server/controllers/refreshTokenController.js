const User = require("../model/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res
      .status(401)
      .json({ error: "Authentication required: No refresh token provided." });

  const refreshToken = cookies.jwt;

  try {
    // check if the refresh token exists in the database
    const foundUser = await User.findOne({ refreshToken }).exec();
    if (!foundUser)
      return res.status(401).json({
        error:
          "Forbidden: Refresh token is invalid or not associated with any user.",
      });

    // verify refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || foundUser.username !== decoded.username)
          return res
            .status(401)
            .json({ error: "Forbidden: Invalid or expired refresh token." });

        // generate a new access token
        const accessToken = jwt.sign(
          { id: foundUser._id },
          process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "10m",
          }
        );

        // send the new access token and the username with relevant data to the client
        return res.json({
          accessToken,
          username: foundUser.username,
          media: foundUser.media,
          history: foundUser.history,
        });
      }
    );
  } catch (err) {
    console.error("Error processing refresh token request:", err);
    return res.status(500).json({
      error:
        "Internal Server Error: Unable to process the refresh token request.",
    });
  }
};

module.exports = { handleRefreshToken };
