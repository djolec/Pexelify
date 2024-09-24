const mongoose = require("mongoose");

const connectDB = async () => {
  console.log(process.env.DATABASE_URI);
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
