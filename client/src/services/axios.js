import axios from "axios";
export const BASE_URL = "https://api.pexels.com/";
// export const SERVER_BASE_URL = "https://pexelify-server.onrender.com/";
export const SERVER_BASE_URL = "http://localhost:5500/";

export const pexelsAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: import.meta.env.VITE_API_KEY,
  },
});

export const serverAxios = axios.create({
  baseURL: import.meta.env.VITE_SERVER_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
