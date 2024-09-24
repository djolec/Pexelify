const express = require("express");
const PORT = process.env.PORT || 5500;
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const errorHandler = require("./middleware/errorHandler");

connectDB();

const app = express();

// built-in middleware for json
app.use(express.json());

// routes
app.use("/register", require("./routes/register"));

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
