const otpLimiter = require("../middleware/otpLimiter");

const rateLimitStatus = async (req, res) => {
  const { username } = req.params;
  console.log(username);

  if (!username)
    return res.status(400).json({ error: "Username is required." });

  try {
    // Using the store to get the rate limit data based on the username
    const data = await otpLimiter.getKey(username);

    if (!data)
      return res
        .status(404)
        .json({ message: "No rate limit data found for this user." });

    return res.status(200).json({ resetTime: data.resetTime });
  } catch (err) {
    // Log the unexpected error for debugging
    console.error("Unexpected error while retrieving rate limit data:", err);

    // Differentiate between internal server error and invalid request
    if (err.name === "RateLimitError") {
      return res.status(500).json({ error: "Rate limiting mechanism failed" });
    }

    // Generic server error for all other unexpected issues
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { rateLimitStatus };
