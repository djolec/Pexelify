import React from "react";
import { useState } from "react";
import { ReactComponent as PhotoIcon } from "../svg/image-solid.svg";
import { ReactComponent as VideosIcon } from "../svg/video-solid.svg";
import { useNumberOfColumns } from "../hooks/useNumberOfColumns";
import PhotoCard from "./PhotoCard";
import VideoCard from "./VideoCard";
import { motion } from "framer-motion";

const Favorites = ({ savedMedia }) => {
  const [photos, setPhotos] = useState(true);
  const { numberOfColumns } = useNumberOfColumns();

  return (
    <section className="w-full flex-grow md:w-[70%]">
      <h1 className="w-full text-left text-2xl text-[var(--on-background)] 2xl:text-5xl">
        Favorites
      </h1>
      <div className="flex flex-row py-2 text-[var(--on-background)] 2xl:text-2xl">
        <button
          onClick={() => setPhotos(true)}
          className={`${
            photos
              ? "bg-[var(--secondary-container)]"
              : "bg-[var(--background)]"
          } flex w-1/2 flex-row items-center justify-center gap-2 rounded-l-full border-[1px] border-gray-500`}
        >
          <PhotoIcon className="h-5 w-auto fill-[var(--on-background)] 2xl:h-10" />
          <span>Photos</span>
        </button>
        <button
          onClick={() => setPhotos(false)}
          className={`${
            !photos
              ? "bg-[var(--secondary-container)]"
              : "bg-[var(--background)]"
          } flex w-1/2 flex-row items-center justify-center gap-2 rounded-r-full border-[1px] border-gray-500`}
        >
          <VideosIcon className="h-5 w-auto fill-[var(--on-background)] 2xl:h-10" />
          <span>Videos</span>
        </button>
      </div>

      <div className="mt-4 columns-2 sm:columns-3">
        {photos
          ? savedMedia
              .filter((savedObj) => savedObj.type === "Photo")
              .map((photoObj) => {
                const { alt, avg_color, height, width, id, src } = photoObj;
                return (
                  <PhotoCard
                    key={id}
                    alt={alt}
                    bgColor={avg_color}
                    source={src}
                    photoWidth={width}
                    photoHeight={height}
                    photoID={id}
                  />
                );
              })
          : savedMedia
              .filter((savedObj) => savedObj.type === "Video")
              .map((videoObj) => {
                const { height, width, image, src, id } = videoObj;
                return (
                  <VideoCard
                    key={id}
                    numberOfColumns={numberOfColumns}
                    source={src}
                    cardWidth={width}
                    cardHeight={height}
                    videoID={id}
                    videoImg={image}
                  />
                );
              })}
      </div>
      {photos &&
        savedMedia.filter((savedObj) => savedObj.type === "Photo").length ===
          0 && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
            className="mt-20 w-full text-center text-2xl text-[var(--on-background)]"
          >
            No photos saved.
          </motion.h1>
        )}
      {!photos &&
        savedMedia.filter((savedObj) => savedObj.type === "Video").length ===
          0 && (
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
            className="mt-20 w-full text-center text-2xl text-[var(--on-background)]"
          >
            No videos saved.
          </motion.h1>
        )}
    </section>
  );
};

export default Favorites;
