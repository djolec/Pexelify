import React from "react";
import PhotosCarousel from "./PhotosCarousel";
import VideoCarousel from "./VideoCarousel";
import CollectionCarousel from "./CollectionCarousel";

const Carousel = () => {
  return (
    <div className="pb-4 scrollbar w-full mx-auto flex flex-row snap-always snap-x snap-mandatory overflow-x-scroll scroll-smooth overflow-y-hidden">
      <PhotosCarousel />
      <VideoCarousel />
      <CollectionCarousel />
    </div>
  );
};

export default Carousel;
