import { useState } from "react";
import PhotoIcon from "../../assets/svg/image-solid.svg?react";
import VideosIcon from "../../assets/svg/video-solid.svg?react";
import PhotoCard from "../../ui/PhotoCard";
import VideoCard from "../../ui/VideoCard";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useContext } from "react";
import { AppContext } from "../../App";

const DisplayFavorites = () => {
  const [photos, setPhotos] = useState(true);
  const { isMobile } = useContext(AppContext);
  const { auth } = useAuth();

  return (
    <section className="mx-auto w-full flex-grow px-4 sm:px-8 md:w-[70%]">
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
          } flex w-1/2 flex-row items-center justify-center gap-2 rounded-l-full border-[1px] border-gray-500 py-1`}
        >
          <PhotoIcon className="h-8 w-auto fill-[var(--on-background)] sm:h-6 2xl:h-10" />
          <span className="text-xl sm:text-lg">Photos</span>
        </button>
        <button
          onClick={() => setPhotos(false)}
          className={`${
            !photos
              ? "bg-[var(--secondary-container)]"
              : "bg-[var(--background)]"
          } flex w-1/2 flex-row items-center justify-center gap-2 rounded-r-full border-[1px] border-gray-500`}
        >
          <VideosIcon className="h-8 w-auto fill-[var(--on-background)] sm:h-6 2xl:h-10" />
          <span className="text-xl sm:text-lg">Videos</span>
        </button>
      </div>

      <div className="mt-4 columns-2 sm:columns-3 2xl:gap-6">
        {photos
          ? auth?.media?.photos?.map((photoObj) => {
              const { alt, avg_color, height, width, id, src, _id } = photoObj;
              return (
                <PhotoCard
                  key={_id}
                  alt={alt}
                  bgColor={avg_color}
                  source={src}
                  photoWidth={width}
                  photoHeight={height}
                  photoID={id}
                />
              );
            })
          : auth?.media?.videos?.map((videoObj) => {
              const { height, width, image, src, id } = videoObj;
              return (
                <VideoCard
                  key={id}
                  isMobile={isMobile}
                  source={src}
                  cardWidth={width}
                  cardHeight={height}
                  videoID={id}
                  videoImg={image}
                />
              );
            })}
      </div>
      {photos && auth?.media?.photos?.length === 0 && (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
          className="mt-20 w-full text-center text-2xl text-[var(--on-background)] 2xl:text-4xl"
        >
          No photos saved.
        </motion.h1>
      )}
      {!photos && auth?.media?.videos?.length === 0 && (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
          className="mt-20 w-full text-center text-2xl text-[var(--on-background)] 2xl:text-4xl"
        >
          No videos saved.
        </motion.h1>
      )}
    </section>
  );
};

export default DisplayFavorites;
