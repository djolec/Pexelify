const express = require("express");
const app = express();
const PORT = process.env.PORT || 5500;
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const verifyJWT = require("./middleware/verifyJWT");
const cookieParser = require("cookie-parser");

connectDB();

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware for json
app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());

// routes
app.use("/register", require("./routes/register"));
app.use("/checkAvailability", require("./routes/checkAvailability"));
app.use("/signIn", require("./routes/signIn"));
app.use("/refresh", require("./routes/refresh"));
app.use("/logout", require("./routes/logout"));

app.use(verifyJWT);
app.use("/media", require("./routes/api/media"));
app.use("/history", require("./routes/api/history"));

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
