const OTP = require("../model/OTP");

const saveOTP = async (foundUser) => {
  // function to generate a random OTP
  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // set expiration time
  const expirationTime = 10 * 60 * 1000; // 10 minutes in milliseconds

  // Generate the OTP
  const otp = generateOTP();

  try {
    //create and store new OTP
    const otpDocument = await OTP.create({
      userId: foundUser._id,
      otpCode: otp,
      xpiresAt: new Date(Date.now() + expirationTime),
    });

    return otpDocument.otpCode;
  } catch (err) {
    console.error("Failed to create OTP code.", err);
    throw new Error("Failed to create OTP code.");
  }
};

module.exports = saveOTP;
