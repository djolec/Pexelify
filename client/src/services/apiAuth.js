import { serverAxios } from "./axios";

// Login
export const apiLogin = async ({ username, password }) => {
  return serverAxios.post(
    "signIn",
    { username, password },
    {
      withCredentials: true,
    }
  );
};

// Register
export const apiRegister = async ({ username, password }) => {
  return serverAxios.post("register", { username, password });
};

// Check if username is available
export const apiCheckAvailability = async (username) => {
  return serverAxios.post("checkAvailability", { username });
};

// Verify email
export const apiVerifyEmail = async (otp) => {
  return serverAxios.post("verify", { otp });
};

// submit OTP
export const apiSendOTP = async (username) => {
  return serverAxios.post("sendOTP", { username });
};

// get OTP cooldown
export const apiOtpCooldown = async (key) => {
  return serverAxios.get(`/rateLimitStatus/otp/${key}`);
};

// get password reset email cooldown
export const apiPwdResetCooldown = async (key) => {
  return serverAxios.get(`/rateLimitStatus/password-reset/${key}`);
};

// send password reset link
export const apiSendPasswordLink = async (username) => {
  return serverAxios.post("/sendPwdResetLink", { username });
};

// reset password
export const apiResetPassword = async ({ password, resetToken }) => {
  return serverAxios.post("/resetPassword", { password, resetToken });
};
