const User = require("../model/User");
const bcrypt = require("bcrypt");

const createNewUser = async (req, res) => {
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
      verificationExpiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });

    res.status(201).json({
      success: `New user ${result.username} created!`,
      username: result.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "There was an error registering the user. Please try again later.",
    });
  }
};

const deleteUser = async (req, _) => {
  const { username } = req.body;
  console.log(`Deleting user: ${username}`);
  try {
    await User.findOneAndDelete({ username });
  } catch (err) {
    console.error("Failed to delete user");
  }
};

module.exports = { createNewUser, deleteUser };
