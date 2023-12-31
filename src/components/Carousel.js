import React from "react";
import PhotosCarousel from "./PhotosCarousel";
import VideoCarousel from "./VideoCarousel";
import CollectionCarousel from "./CollectionCarousel";

const Carousel = () => {
  return (
    <div className="scrollbar 2xl:scrollbarLarge mx-auto flex w-full snap-x snap-start flex-row overflow-y-hidden overflow-x-scroll scroll-smooth pb-4">
      <PhotosCarousel />
      <VideoCarousel />
      <CollectionCarousel />
    </div>
  );
};

export default Carousel;
