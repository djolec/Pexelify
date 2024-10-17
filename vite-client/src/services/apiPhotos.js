import { pexelsAxios, infinitePexelsAxios } from "./axios";

const fetchParam = "page=1&per_page=27";

// fetch curated photos for homepage
export const homepagePhotos = async () => {
  return pexelsAxios.get(`v1/curated?${fetchParam}`);
};

// fetch curated photos for photos page
export const curatedPhotos = async ({ pageParam }) => {
  return infinitePexelsAxios.get(`${pageParam}`);
};

// fetch photo using ID
export const photoByID = async (id) => {
  return pexelsAxios.get(`v1/photos/${id}`);
};

// fetch searched photos
export const searchPhotos = async ({ pageParam }) => {
  return infinitePexelsAxios.get(`${pageParam}`);
};
