import { serverAxios, baseServerAxios } from "./axios";

// Login
export const apiLogin = async ({ username, password }) => {
  return serverAxios.post("signIn", { username, password });
};

// Register
export const apiRegister = async ({ username, password }) => {
  return serverAxios.post("register", { username, password });
};

// Check if username is available
export const apiCheckAvailability = async (username) => {
  return baseServerAxios.post("checkAvailability", { username });
};
