import React from "react";
import { useEffect, useContext } from "react";
import { AppContext } from "../App";
import Carousel from "./Carousel";
import Carousel1 from "./Carousel1";
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
      {/*       <Carousel /> */}
      <Carousel1 />
      <FeaturedPhotos />
      <PopularVideos />
      <FeaturedCollections />
    </div>
  );
};

export default HomePage;
