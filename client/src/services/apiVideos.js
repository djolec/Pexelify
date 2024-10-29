const fetchParam = "page=1&per_page=40";
import { pexelsAxios } from "./axios";

// fetch popular videos for homepage
export const homepageVideos = async () => {
  return pexelsAxios.get(`videos/popular?${fetchParam}`);
};

// fetch popular videos for videos page
export const popularVideos = async ({ pageParam }) => {
  return pexelsAxios.get(`${pageParam}`);
};

// fetch video using ID
export const videoByID = async (id) => {
  return pexelsAxios.get(`videos/videos/${id}`);
};

// fetch searched videos
export const searchVideos = async ({ pageParam }) => {
  return pexelsAxios.get(`${pageParam}`);
};
