const User = require("../model/User");

const updateHistory = async (req, res) => {
  const { id } = req;
  const { history } = req.body;
  console.log(history);
  console.log(id);

  if (!id) return res.status(400).json({ error: "User ID is required." });
  if (!Array.isArray(history))
    return res.status(400).json({ error: "History should be an array." });

  try {
    const foundUser = await User.findById(id);

    if (!foundUser) return res.status(404).json({ error: "User not found." });

    foundUser.history = history;

    await foundUser.save();

    return res.status(200).json({
      message: "History updated successfully.",
      history: foundUser.history,
    });
  } catch (err) {
    console.error("Error during history update:", err);
    return res
      .status(500)
      .json({ error: "Error updating history.", details: err.message });
  }
};

module.exports = { updateHistory };
