const User = require("../model/User");
const bcrypt = require("bcrypt");

const registerNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ error: "Username and password are required" });

  try {
    // check for duplicate usernames in the db
    const duplicate = await User.findOne({ username }).exec();
    if (duplicate)
      return res.status(409).json({
        error: "Username already taken",
      });

    //encrypt the password
    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const result = await User.create({
      username,
      password: hashedPwd,
      media: {
        photos: [],
        videos: [],
      },
      verified: false,
    });

    res.status(201).json({
      success: `New user ${result.username} created!`,
      username: result.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Server error: try again later",
    });
  }
};

module.exports = { registerNewUser };
