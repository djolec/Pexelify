import axios from "axios";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

const photoRequestUrl = "https://api.pexels.com/v1/";
const videoRequestUrl = "https://api.pexels.com/videos/";
const api_key = process.env.REACT_APP_API_KEY;
const options = {
  headers: {
    Authorization: api_key,
  },
};

/* Fetch Featured Photos For Homepage */

const fetchHomepagePhotoData = (searchParam) => {
  return axios.get(`${photoRequestUrl}curated?${searchParam}`, options);
};

export const useFetchHomepagePhotos = (searchParam) => {
  return useQuery({
    queryKey: ["homepage photos"],
    queryFn: () => fetchHomepagePhotoData(searchParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

/* Fetch Popular Videos For Homepage*/

const fetchHomepageVideoData = (searchParam) => {
  return axios.get(`${videoRequestUrl}popular?${searchParam}`, options);
};

export const useFetchHomepageVideos = (searchParam) => {
  return useQuery({
    queryKey: ["videos, popular"],
    queryFn: () => fetchHomepageVideoData(searchParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

/* Fetch Featured Collections For Homepage */

const fetchHomepageCollections = (searchParam) => {
  return axios.get(
    `${photoRequestUrl}collections/featured?${searchParam}`,
    options,
  );
};

export const useFetchHomepageCollections = (searchParam) => {
  return useQuery({
    queryKey: ["collections, featured"],
    queryFn: () => fetchHomepageCollections(searchParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

/* Fetch Curated Photos For Photos Page */

const fetchCuratedPhotos = ({ pageParam }) => {
  return axios.get(`${pageParam}`, options);
};

export const useFetchCuratedPhotos = () => {
  return useInfiniteQuery({
    queryKey: ["curated"],
    queryFn: (pageParam) => fetchCuratedPhotos(pageParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialPageParam: `${photoRequestUrl}curated?page=1&per_page=27`,
    getNextPageParam: (lastPage, pages) => lastPage.data.next_page,
  });
};

/* Fetch All Popular Videos For Videos Page*/

const fetchAllPopular = ({ pageParam }) => {
  return axios.get(`${pageParam}`, options);
};

export const useFetchAllPopular = () => {
  return useInfiniteQuery({
    queryKey: ["all", "popular"],
    queryFn: (pageParam) => fetchAllPopular(pageParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialPageParam: `${videoRequestUrl}popular?page=1&per_page=30`,
    getNextPageParam: (lastPage, pages) => lastPage.data.next_page,
  });
};

/* Fetch All Collections For Collections Page */

const fetchAllCollections = ({ pageParam }) => {
  return axios.get(`${pageParam}`, options);
};

export const useFetchAllCollections = () => {
  return useInfiniteQuery({
    queryKey: ["collections"],
    queryFn: (pageParam) => fetchAllCollections(pageParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialPageParam: `${photoRequestUrl}collections/featured?page=1&per_page=54`,
    getNextPageParam: (lastPage, pages) => lastPage.data.next_page,
  });
};

/* Fetch Photos Using Filter */

const searchPhotos = ({ pageParam }) => {
  return axios.get(`${pageParam}`, options);
};

export const useSearchPhotos = (searchQuery, searchObj) => {
  return useInfiniteQuery({
    queryKey: [
      "search",
      "photos",
      `${searchQuery}`,
      `${searchObj.orientation}`,
      `${searchObj.size}`,
      `${searchObj.color}`,
    ],
    queryFn: (pageParam) => searchPhotos(pageParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialPageParam: `${photoRequestUrl}search?query=${searchQuery}&page=1&per_page=30${
      searchObj.orientation
        ? `&orientation=${searchObj.orientation.toLowerCase()}`
        : ""
    }${searchObj.size ? `&size=${searchObj.size.toLowerCase()}` : ""}${
      searchObj.color ? `&color=${searchObj.color.slice(1)}` : ""
    }`,
    getNextPageParam: (lastPage, pages) => lastPage.data.next_page,
  });
};

/* Fetch Videos Using Filter */

const searchVideos = ({ pageParam }) => {
  return axios.get(`${pageParam}`, options);
};

export const useSearchVideos = (searchQuery, searchObj) => {
  return useInfiniteQuery({
    queryKey: [
      "search",
      "videos",
      `${searchQuery}`,
      `${searchObj.orientation}`,
      `${searchObj.size}`,
    ],
    queryFn: (pageParam) => searchVideos(pageParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialPageParam: `${videoRequestUrl}search?query=${searchQuery}&page=1&per_page=30${
      searchObj.orientation
        ? `&orientation=${searchObj.orientation.toLowerCase()}`
        : ""
    }${searchObj.size ? `&size=${searchObj.size.toLowerCase()}` : ""}`,
    getNextPageParam: (lastPage, pages) => lastPage.data.next_page,
  });
};

/* Fetch Photo by ID */

const fetchPhotoById = (id) => {
  return axios.get(`${photoRequestUrl}/photos/${id}`, options);
};

export const useFetchPhotoById = (id) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => fetchPhotoById(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

/* Fetch Collection by ID */

const fetchCollectionById = ({ pageParam }) => {
  return axios.get(`${pageParam}`, options);
};

export const useFetchCollectionById = (id) => {
  return useInfiniteQuery({
    queryKey: ["collections", id],
    queryFn: (pageParam) => fetchCollectionById(pageParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialPageParam: `${photoRequestUrl}collections/${id}?page=1&per_page=27`,
    getNextPageParam: (lastPage, pages) => lastPage.data.next_page,
  });
};

/* Fetch Video by ID */

const fetchVideoById = (id) => {
  return axios.get(`${videoRequestUrl}/videos/${id}`, options);
};

export const useFetchVideoById = (id) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => fetchVideoById(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
