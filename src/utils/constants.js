import Homepage from "../components/Homepage";
import CuratedPhotos from "../components/CuratedPhotos";
import PopularVideos from "../components/PopularVideos";
import FeaturedCollections from "../components/FeaturedCollections";
import PhotoDetails from "../components/PhotoDetails";
import VideoDetails from "../components/VideoDetails";
import CollectionDetails from "../components/CollectionDetails";
import SearchPhotos from "../components/SearchPhotos";
import SearchVideos from "../components/SearchVideos";
import Favorites from "../components/Favorites";

import { ReactComponent as HomeIcon } from "../svg/home-solid.svg";
import { ReactComponent as PhotoIcon } from "../svg/image-solid.svg";
import { ReactComponent as VideosIcon } from "../svg/video-solid.svg";
import { ReactComponent as CollIcon } from "../svg/journal-album.svg";
import { ReactComponent as FavIcon } from "../svg/heart-straight-bold.svg";

export const routes = [
  {
    path: "/",
    element: Homepage,
  },
  {
    path: "/photos/curated",
    element: CuratedPhotos,
  },
  {
    path: "/videos/popular",
    element: PopularVideos,
  },
  {
    path: "/collections/featured",
    element: FeaturedCollections,
  },
  {
    path: "/photos/details/:id",
    element: PhotoDetails,
  },
  {
    path: "/videos/details/:id",
    element: VideoDetails,
  },
  {
    path: "/collections/:id/:name",
    element: CollectionDetails,
  },
  {
    path: "/photos/:id",
    element: SearchPhotos,
  },
  {
    path: "/videos/:id",
    element: SearchVideos,
  },
  {
    path: "/favorites",
    element: Favorites,
    savedMedia: true,
  },
];

export const desktopNavItems = [
  { text: "Home", icon: HomeIcon, link: "/" },
  { text: "Photos", icon: PhotoIcon, link: "/photos/curated" },
  { text: "Videos", icon: VideosIcon, link: "/videos/popular" },
  { text: "Collections", icon: CollIcon, link: "/collections/featured" },
  { text: "Favorites", icon: FavIcon, link: "/favorites" },
];

export const carouselData = {
  borders: [
    "rounded-br-2xl",
    "rounded-b-2xl",
    "rounded-bl-2xl",
    "rounded-tr-2xl",
    "rounded-t-2xl",
    "rounded-tl-2xl",
  ],
  carousels: [
    {
      type: "curated photos",
      mainText: "High quality stock photos for free!",
      smallText:
        "Explore our exceptional collection of high-quality stock photos.",
      bgColor: "--primary-container",
      textColor: "--primary",
      link: "/photos/curated",
      assets: [
        { link: "/assets/images/photo-banner-1.webp", type: "photo" },
        { link: "/assets/images/photo-banner-2.webp", type: "photo" },
        { link: "/assets/images/photo-banner-3.webp", type: "photo" },
        { link: "/assets/images/photo-banner-4.webp", type: "photo" },
        { link: "/assets/images/photo-banner-5.webp", type: "photo" },
        { link: "/assets/images/photo-banner-6.webp", type: "photo" },
      ],
    },
    {
      type: "popular videos",
      mainText: "Top rated stock videos for free!",
      smallText:
        "Our curated selection videos are sure to inspire and captivate.",
      bgColor: "--secondary-container",
      textColor: "--secondary",
      link: "/videos/popular",
      assets: [
        {
          link: "/assets/videos/video-banner-1.webm",
          type: "video",
          height: "420",
          width: "360",
        },
        {
          link: "/assets/videos/video-banner-2.webm",
          type: "video",
          height: "640",
          width: "360",
        },
        {
          link: "/assets/videos/video-banner-3.webm",
          type: "video",
          height: "360",
          width: "480",
        },
        {
          link: "/assets/videos/video-banner-4.webm",
          type: "video",
          height: "640",
          width: "360",
        },
        {
          link: "/assets/videos/video-banner-5.webm",
          type: "video",
          height: "360",
          width: "640",
        },
        {
          link: "/assets/videos/video-banner-6.webm",
          type: "video",
          height: "360",
          width: "480",
        },
      ],
    },
    {
      type: "featured collections",
      mainText: "Best collections with best media!",
      smallText:
        "Discover a treasure trove of stunning images and captivating videos.",
      bgColor: "--tertiary-container",
      textColor: "--tertiary",
      link: "/collections/featured",
      assets: [
        {
          link: "/assets/images/collection-banner-1.webp",
          type: "photo",
        },
        {
          link: "/assets/videos/collection-banner-2.webm",
          type: "video",
          height: "640",
          width: "360",
        },
        {
          link: "/assets/images/collection-banner-3.webp",
          type: "photo",
        },
        {
          link: "/assets/images/collection-banner-4.webp",
          type: "photo",
        },

        {
          link: "/assets/videos/collection-banner-5.webm",
          type: "video",
          height: "360",
          width: "640",
        },
        {
          link: "/assets/videos/collection-banner-6.webm",
          type: "video",
          height: "360",
          width: "480",
        },
      ],
    },
  ],
};
