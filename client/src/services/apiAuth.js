import axios from "axios";

export const registerUser = async ({ username, password }) => {
  const response = await axios.post(
    "https://pexelify-server.onrender.com/register",
    {
      username,
      password,
    },
  );

  return response.data;
};
