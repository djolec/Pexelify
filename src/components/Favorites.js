import React from "react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import PhotoCard from "./PhotoCard";
import VideoCard from "./VideoCard";
import { LiaVideoSolid } from "react-icons/lia";
import { MdInsertPhoto } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

const Favorites = () => {
  const [favoritePhotosOrVideos, setFavoritePhotosOrVideos] =
    useState("Photos");
  const { savedMedia, setPageSelected, isMobileView } = useContext(AppContext);

  useEffect(() => {
    setPageSelected("Favorites");
  }, []);

  return (
    <section
      className="flex-grow w-full flex flex-row
       justify-center items-start"
    >
      <div className="md:w-[70%] w-full">
        <h1 className="w-full text-left text-2xl text-[var(--on-background)]">
          Favorites
        </h1>
        <div className="py-2 flex flex-row text-[var(--on-background)]">
          <button
            onClick={() => setFavoritePhotosOrVideos("Photos")}
            className={`w-1/2 rounded-l-full border-[1px] border-gray-500 flex flex-row items-center justify-center gap-2 ${
              favoritePhotosOrVideos === "Photos"
                ? "bg-[var(--secondary-container)]"
                : null
            }`}
          >
            <MdInsertPhoto className="h-5 w-auto" />
            <span>Photos</span>
          </button>
          <button
            onClick={() => setFavoritePhotosOrVideos("Videos")}
            className={`w-1/2 rounded-r-full border-[1px] border-gray-500 flex flex-row items-center justify-center gap-2 ${
              favoritePhotosOrVideos === "Videos"
                ? "bg-[var(--secondary-container)]"
                : null
            }`}
          >
            <LiaVideoSolid className="h-5 w-auto" />
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
                  return (
                    <div key={card.id} className="mb-4">
                      <PhotoCard
                        bgColor={card.avg_color}
                        source={card.src.medium}
                        photoWidth={card.width}
                        photoHeight={card.height}
                        photoID={card.id}
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
              className="w-full text-2xl text-left text-[var(--on-background)] absolute top-10 left-0 "
            >
              No photos saved.
            </motion.h1>
          ) : null}

          {favoritePhotosOrVideos === "Videos"
            ? savedMedia
                .filter((video) => video.type === "Video")
                .map((card) => {
                  return (
                    <div key={card.id} className="mb-4">
                      <VideoCard
                        bgImage={card.image}
                        source={card.src}
                        cardWidth={card.width}
                        cardHeight={card.height}
                        videoID={card.id}
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
              className="w-full text-2xl text-left text-[var(--on-background)] absolute top-10 left-0"
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
