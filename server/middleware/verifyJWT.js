const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({
      error:
        "Authentication Error: Missing or malformed access token in the request headers.",
    });

  const accessToken = authHeader.split(" ")[1];

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({
        error:
          "Forbidden: The provided access token is either invalid or has expired. Please sign in again.",
      });

    req.id = decoded.id;
    next();
  });
};

module.exports = verifyJWT;
