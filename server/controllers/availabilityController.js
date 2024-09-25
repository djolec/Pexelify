const User = require("../model/User");

const checkAvailability = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username)
      return res.status(400).json({ message: "Username is required" });

    // Check for duplicate usernames in the DB
    const duplicate = await User.findOne({ username }).exec();
    if (duplicate)
      return res.status(409).json({
        exists: true,
        message:
          "Please choose a different username, because this one is already taken.",
      }); // Conflict

    return res.status(200).json({ message: "The username is available" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { checkAvailability };
