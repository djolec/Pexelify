import { pexelsAxios } from "./axios";

const fetchParam = "page=1&per_page=18";

// fetch collections for homepage
export const homepageCollections = async () => {
  return pexelsAxios.get(`v1/collections/featured?${fetchParam}`);
};

// fetch featured collections for collections page
export const featuredCollections = async ({ pageParam }) => {
  return pexelsAxios.get(`${pageParam}`);
};

// fetch collection by ID
export const collectionByID = async ({ pageParam }) => {
  return pexelsAxios.get(`${pageParam}`);
};
