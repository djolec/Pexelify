import React from "react";
import Carousel from "./Carousel";
import HomepagePhotos from "./HomepagePhotos";
import HomepageVideos from "./HomepageVideos";
import HomepageCollections from "./HomepageCollections";
import { useEffect } from "react";

const Homepage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex w-full flex-col items-center gap-8 pb-8">
      <Carousel />
      <HomepagePhotos />
      <HomepageVideos />
      <HomepageCollections />
    </div>
  );
};

export default Homepage;
