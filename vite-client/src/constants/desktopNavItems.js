import HomeIcon from "../assets/svg/home-solid.svg?react";
import PhotoIcon from "../assets/svg/image-solid.svg?react";
import VideosIcon from "../assets/svg/video-solid.svg?react";
import CollIcon from "../assets/svg/journal-album.svg?react";
import FavIcon from "../assets/svg/heart-straight-bold.svg?react";

const desktopNavItems = [
  { text: "Home", icon: HomeIcon, link: "/homepage" },
  { text: "Photos", icon: PhotoIcon, link: "/photos/curated" },
  { text: "Videos", icon: VideosIcon, link: "/videos/popular" },
  { text: "Collections", icon: CollIcon, link: "/collections/featured" },
  { text: "Favorites", icon: FavIcon, link: "/favorites" },
];

export default desktopNavItems;
