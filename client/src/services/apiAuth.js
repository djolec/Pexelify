import { baseServerAxios, serverAxios } from "./axios";

// Login
export const apiLogin = async ({ username, password }) => {
  return serverAxios.post("signIn", { username, password });
};

// Register
export const apiRegister = async ({ username, password }) => {
  return baseServerAxios.post("register", { username, password });
};

// Check if username is available
export const apiCheckAvailability = async (username) => {
  return baseServerAxios.post("checkAvailability", { username });
};

// Verify email
export const apiVerifyEmail = async (otp) => {
  return baseServerAxios.post("verify", { otp });
};

// submit OTP
export const apiSendOTP = async (username) => {
  return baseServerAxios.post("sendOTP", { username });
};

// get OTP cooldown
export const apiOtpCooldown = async (username) => {
  return baseServerAxios.get(`/rateLimitStatus/${username}`);
};
