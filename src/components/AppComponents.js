import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import DesktopNav from "./DesktopNav";
import Homepage from "./Homepage";
import CuratedPhotos from "./CuratedPhotos";
import PopularVideos from "./PopularVideos";
import FeaturedCollections from "./FeaturedCollections";
import { Routes, Route, useLocation } from "react-router-dom";
import PhotoDetails from "./PhotoDetails";
import VideoDetails from "./VideoDetails";
import CollectionDetails from "./CollectionDetails";
import SearchPhotos from "./SearchPhotos";
import SearchVideos from "./SearchVideos";
import Favorites from "./Favorites";

const AppComponents = ({ savedMedia, darkMode }) => {
  const location = useLocation();

  return (
    <div
      className={`${
        location.pathname.includes("details") ? "" : "md:pl-[280px]"
      }  flex min-h-screen flex-col`}
    >
      <Header />
      <DesktopNav />
      <main
        className={`flex flex-grow flex-col items-center gap-4 bg-[var(--background)] px-4 lg:px-8  
        ${location.pathname.includes("details") ? "" : "pt-24"} md:pt-0`}
      >
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/photos/curated" element={<CuratedPhotos />} />
          <Route path="/videos/popular" element={<PopularVideos />} />
          <Route
            path="/collections/featured"
            element={<FeaturedCollections />}
          />
          <Route path="/photos/details/:id" element={<PhotoDetails />} />
          <Route path="/videos/details/:id" element={<VideoDetails />} />
          <Route
            path="/collections/:id/:name"
            element={<CollectionDetails />}
          />
          <Route path="/photos/:id" element={<SearchPhotos />} />
          <Route path="/videos/:id" element={<SearchVideos />} />
          <Route
            path="/favorites"
            element={<Favorites savedMedia={savedMedia} />}
          />
        </Routes>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default AppComponents;
