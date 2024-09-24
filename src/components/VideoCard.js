import React from "react";
import { ReactComponent as FavIcon } from "../svg/heart-straight-bold.svg";
import { ReactComponent as SavedIcon } from "../svg/heart-straight-fill.svg";
import { ReactComponent as PlayIcon } from "../svg/play.svg";
import { useRef, useState, useContext } from "react";
import { AppContext } from "../App";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const VideoCard = ({
  source,
  cardWidth,
  cardHeight,
  videoID,
  videoImg,
  numberOfColumns,
}) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { savedMedia, setSavedMedia } = useContext(AppContext);

  const handleMouseEnter = () => {
    if (isLoaded && videoRef.current) {
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (isLoaded) {
      videoRef.current.pause();
    }
  };

  const updateMedia = (newMedia) => {
    setSavedMedia(newMedia);
    localStorage.setItem("savedMedia", JSON.stringify(newMedia));
  };

  const saveMedia = () => {
    const mediaObj = {
      type: "Video",
      id: videoID,
      width: cardWidth,
      height: cardHeight,
      src: source,
      image: videoImg,
    };
    const newMedia = [...savedMedia, mediaObj];
    updateMedia(newMedia);
  };

  const deleteMedia = () => {
    const newMedia = savedMedia.filter((obj) => obj.id !== videoID);
    updateMedia(newMedia);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      style={{
        aspectRatio: `${cardWidth}/${cardHeight}`,
      }}
      className="group relative mb-4 w-full overflow-hidden rounded-2xl bg-[#333] 2xl:mb-6"
    >
      {savedMedia.some((obj) => obj.id === videoID) ? (
        <button
          onClick={deleteMedia}
          aria-label="remove from favorites"
          className="absolute bottom-2 right-2 z-10 grid h-10 w-10 place-content-center text-white 2xl:bottom-6 2xl:right-6"
        >
          <SavedIcon className="h-6 w-auto fill-white 2xl:h-10" />
        </button>
      ) : (
        <button
          onClick={saveMedia}
          aria-label="save to favorites"
          className="absolute bottom-2 right-2 z-10 grid h-10 w-10 place-content-center text-white opacity-100 md:opacity-0  md:transition-opacity md:duration-300 md:group-hover:opacity-100 2xl:bottom-6 2xl:right-6"
        >
          <FavIcon className="h-6 w-auto fill-white 2xl:h-10" />
        </button>
      )}

      <div className="absolute left-4 top-4 overflow-hidden rounded-md text-black opacity-100 md:transition-opacity md:duration-200 md:group-hover:opacity-0">
        <PlayIcon className="h-5 w-auto bg-[#ffddb5] p-1 2xl:h-9" />
      </div>

      <Link
        aria-label={`View video ${videoID}`}
        to={`/app/videos/details/${videoID}`}
      >
        {numberOfColumns === 2 ? (
          <div
            className="h-full w-full bg-cover"
            style={{ backgroundImage: `url(${videoImg})` }}
          />
        ) : (
          <motion.video
            height={cardHeight}
            width={cardWidth}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={videoRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="h-full w-full"
            loop={true}
            preload="metadata"
            muted
            onLoadedData={() => setIsLoaded(true)}
          >
            <source src={source} type="video/mp4" />
          </motion.video>
        )}
      </Link>

      <div className="hsl-card pointer-events-none absolute bottom-0 h-1/3 w-full opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100" />
    </motion.div>
  );
};

export default VideoCard;
