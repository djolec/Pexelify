const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("123");
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      // useNewUrlParser: true,
      //   useUnifiedTopology: true,
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
