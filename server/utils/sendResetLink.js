const nodemailer = require("nodemailer");

const sendResetLink = async (foundUser, resetToken) => {
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

  // URL for the reset password page, with the reset token as a query parameter
  const resetUrl = `https://pexelify.onrender.com/reset-password?token=${resetToken}`;

  // set up email data
  const mailOptions = {
    from: '"Pexelify Support" <pexelify@gmail.com>',
    to: foundUser.username,
    subject: "Reset Pexelify Password", // Subject line
    text: `Click the link to reset your password: ${resetUrl}`, // Plain text body
    html: `<p>Click the button below to reset your password:</p>
      <a href="${resetUrl}" style="
        display: inline-block;
        padding: 10px 20px;
        font-size: 16px;
        color: #fff;
        background-color: #007bff;
        text-decoration: none;
        border-radius: 5px;
      ">Reset Password</a>
      <p>If you did not request this, please ignore this email.</p>`, // HTML body
  };

  // send email
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error("Failed to send password reset email", err);

    // Clear the resetPwdToken if email sending fails
    foundUser.resetPwdToken = "";
    await foundUser.save();

    throw new Error("Failed to send password reset email");
  }
};

module.exports = sendResetLink;
