import React from "react";
import { useEffect, useContext } from "react";
import { AppContext } from "../App";
import Carousel from "./Carousel";
import FeaturedPhotos from "./FeaturedPhotos";
import PopularVideos from "./PopularVideos";
import FeaturedCollections from "./FeaturedCollections";

const HomePage = () => {
  const { setPageSelected } = useContext(AppContext);

  useEffect(() => {
    setPageSelected("Homepage");
  });

  return (
    <div className="flex flex-col gap-8 pb-16">
      <Carousel />
      <FeaturedPhotos />
      <PopularVideos />
      <FeaturedCollections />
    </div>
  );
};

export default HomePage;
