import React from "react";
import { motion } from "framer-motion";
import {
  PhotosCarousel,
  VideoCarousel,
  CollectionCarousel,
} from "../components";

const Carousel = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      className="scrollbar 2xl:scrollbarLarge mx-auto flex w-full snap-x snap-mandatory flex-row overflow-y-hidden overflow-x-scroll scroll-smooth pb-4"
    >
      <PhotosCarousel />
      <VideoCarousel />
      <CollectionCarousel />
    </motion.div>
  );
};

export default Carousel;
