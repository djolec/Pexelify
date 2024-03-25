import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  PhotosCarousel,
  VideoCarousel,
  CollectionCarousel,
} from "../components";

const Carousel1 = () => {
  const [num, setNum] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  useEffect(() => {
    let timeoutId;
    if (!isHovered) {
      timeoutId = setTimeout(() => {
        if (num === -200) {
          setNum(0);
        } else {
          setNum(num - 100);
        }
      }, 3500);
    }
    return () => clearTimeout(timeoutId);
  }, [num, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const touchDiff = touchEndX - touchStartX;
    if (touchDiff > 50 && num < 0) {
      // Swipe right
      setNum(num + 100);
    } else if (touchDiff < -50 && num > -200) {
      // Swipe left
      setNum(num - 100);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.4 } }}
      className="mx-auto w-full overflow-hidden"
    >
      <div className="w-full overflow-hidden rounded-2xl">
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex w-full flex-row transition-transform duration-500 ease-in-out"
          style={{ transform: `translate(${num}%, 0%)` }}
        >
          <PhotosCarousel />
          <VideoCarousel />
          <CollectionCarousel />
        </div>
      </div>
      <div className="mt-6 flex flex-row justify-center gap-4">
        <div
          onClick={() => setNum(0)}
          className={`h-3 w-3 cursor-pointer rounded-full ${
            num === 0 ? "bg-red-600" : "bg-black"
          } transition-colors duration-300 sm:hover:bg-red-400`}
        />
        <div
          onClick={() => setNum(-100)}
          className={`h-3 w-3 cursor-pointer rounded-full ${
            num === -100 ? "bg-red-600" : "bg-black"
          } transition-colors duration-300 sm:hover:bg-red-400`}
        />
        <div
          onClick={() => setNum(-200)}
          className={`h-3 w-3 cursor-pointer rounded-full ${
            num === -200 ? "bg-red-600" : "bg-black"
          } transition-colors duration-300 sm:hover:bg-red-400`}
        />
      </div>
    </motion.div>
  );
};

export default Carousel1;
