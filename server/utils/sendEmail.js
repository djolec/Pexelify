const nodemailer = require("nodemailer");

const sendEmail = async (username, otp) => {
  // define transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
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
    const info = await transporter.sendMail(mailOptions);

    if (
      !info.accepted ||
      info.accepted.length === 0 ||
      (info.rejected && info.rejected.length > 0)
    ) {
      throw new Error("Failed to send verification code to email");
    }
  } catch (err) {
    console.error("Nodemailer transport error:", err);
    throw new Error("Failed to send verification code to email");
  }
};

module.exports = sendEmail;
