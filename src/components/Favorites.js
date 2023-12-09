import React from "react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import PhotoCard from "./PhotoCard";
import VideoCard from "./VideoCard";
import { LiaVideoSolid } from "react-icons/lia";
import { MdInsertPhoto } from "react-icons/md";
import { motion } from "framer-motion";

const Favorites = () => {
  const {
    savedMedia,
    setPageSelected,
    isMobileView,
    favoritePhotosOrVideos,
    setFavoritePhotosOrVideos,
  } = useContext(AppContext);

  useEffect(() => {
    setPageSelected("Favorites");
  }, []);

  return (
    <section
      className="flex w-full flex-grow flex-row
       items-start justify-center"
    >
      <div className="w-full md:w-[70%]">
        <h1 className="w-full text-left text-2xl text-[var(--on-background)] 2xl:text-5xl">
          Favorites
        </h1>
        <div className="flex flex-row py-2 text-[var(--on-background)] 2xl:text-2xl">
          <button
            onClick={() => setFavoritePhotosOrVideos("Photos")}
            className={`flex w-1/2 flex-row items-center justify-center gap-2 rounded-l-full border-[1px] border-gray-500 ${
              favoritePhotosOrVideos === "Photos"
                ? "bg-[var(--secondary-container)]"
                : null
            }`}
          >
            <MdInsertPhoto className="h-5 w-auto 2xl:h-10" />
            <span>Photos</span>
          </button>
          <button
            onClick={() => setFavoritePhotosOrVideos("Videos")}
            className={`flex w-1/2 flex-row items-center justify-center gap-2 rounded-r-full border-[1px] border-gray-500 ${
              favoritePhotosOrVideos === "Videos"
                ? "bg-[var(--secondary-container)]"
                : null
            }`}
          >
            <LiaVideoSolid className="h-5 w-auto 2xl:h-10" />
            <span>Videos</span>
          </button>
        </div>
        <div
          className={`${
            isMobileView ? "columns-2" : "columns-3"
          } relative py-4`}
        >
          {favoritePhotosOrVideos === "Photos"
            ? savedMedia
                .filter((photo) => photo.type === "Photo")
                .map((card) => {
                  const {
                    id,
                    avg_color,
                    width,
                    height,
                    src: { medium },
                  } = card;
                  return (
                    <div key={card.id} className="mb-4">
                      <PhotoCard
                        bgColor={avg_color}
                        source={medium}
                        photoWidth={width}
                        photoHeight={height}
                        photoID={id}
                      />
                    </div>
                  );
                })
            : null}
          {favoritePhotosOrVideos === "Photos" &&
          savedMedia.filter((photo) => photo.type === "Photo").length === 0 ? (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-10 w-full text-left text-2xl text-[var(--on-background)] 2xl:text-4xl "
            >
              No photos saved.
            </motion.h1>
          ) : null}

          {favoritePhotosOrVideos === "Videos"
            ? savedMedia
                .filter((video) => video.type === "Video")
                .map((card) => {
                  const { id, image, src, width, height } = card;
                  return (
                    <div key={id} className="mb-4">
                      <VideoCard
                        bgImage={image}
                        source={src}
                        cardWidth={width}
                        cardHeight={height}
                        videoID={id}
                        videoImg={image}
                      />
                    </div>
                  );
                })
            : null}
          {favoritePhotosOrVideos === "Videos" &&
          savedMedia.filter((video) => video.type === "Video").length === 0 ? (
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 top-10 w-full text-left text-2xl text-[var(--on-background)] 2xl:text-4xl"
            >
              No videos saved.
            </motion.h1>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Favorites;
