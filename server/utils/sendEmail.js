const nodemailer = require("nodemailer");

const sendEmail = async (username, otp) => {
  // define transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // set up email data
  const mailOptions = {
    from: '"Pexelify Support" <pexelify@gmail.com>',
    to: username,
    subject: "Verify Your Email", // Subject line
    text: `Here is your verification code: ${otp}`, // Plain text body
    html: `Here is your verification code: <b>${otp}</b>`, // HTML body
  };

  // send email
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Failed to send email", err);
    throw new Error("Failed to send OTP email.");
  }
};

module.exports = sendEmail;
