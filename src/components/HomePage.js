import React from "react";
import { useEffect, useContext } from "react";
import { AppContext } from "../App";
import Carousel from "./Carousel";
import Carousel1 from "./Carousel1";
import FeaturedPhotos from "./FeaturedPhotos";
import PopularVideos from "./PopularVideos";
import FeaturedCollections from "./FeaturedCollections";
import { motion } from "framer-motion";

const HomePage = () => {
  const { setPageSelected } = useContext(AppContext);

  useEffect(() => {
    setPageSelected("Homepage");
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.2 } }}
      className="flex flex-col gap-8 pb-16"
    >
      {/*       <Carousel /> */}
      <Carousel1 />
      <FeaturedPhotos />
      <PopularVideos />
      <FeaturedCollections />
    </motion.div>
  );
};

export default HomePage;
