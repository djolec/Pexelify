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
      expiresAt: new Date(Date.now() + expirationTime),
    });

    return otpDocument.otpCode;
  } catch (err) {
    throw new Error(
      "Failed to create OTP code. Please try registering again later.",
    );
  }
};

module.exports = saveOTP;
