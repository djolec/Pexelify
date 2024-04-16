import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as FavIcon } from "../svg/heart-straight-bold.svg";
import { ReactComponent as SavedIcon } from "../svg/heart-straight-fill.svg";
import { useContext } from "react";
import { AppContext } from "../App";
import { motion } from "framer-motion";

const PhotoCard = ({
  source,
  bgColor,
  photoWidth,
  photoHeight,
  photoID,
  alt,
}) => {
  const { savedMedia, setSavedMedia } = useContext(AppContext);

  const updateMedia = (newMedia) => {
    setSavedMedia(newMedia);
    localStorage.setItem("savedMedia", JSON.stringify(newMedia));
  };

  const saveMedia = () => {
    const mediaObj = {
      type: "Photo",
      id: photoID,
      width: photoWidth,
      height: photoHeight,
      src: source,
      avg_color: bgColor,
      alt: alt,
    };

    const newMedia = [...savedMedia, mediaObj];
    updateMedia(newMedia);
  };

  const deleteMedia = () => {
    const newMedia = savedMedia.filter((obj) => obj.id !== photoID);
    updateMedia(newMedia);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="group relative mb-4 w-full overflow-hidden rounded-2xl 2xl:mb-6"
      style={{
        backgroundColor: `${bgColor}`,
        aspectRatio: `${photoWidth}/${photoHeight}`,
      }}
    >
      {savedMedia.some((obj) => obj.id === photoID) ? (
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
      <Link
        aria-label={`View photo ${alt}`}
        to={`/photos/details/${photoID}`}
        className="h-full w-full cursor-pointer"
      >
        <motion.img
          className="h-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          src={source}
          loading="lazy"
          alt={alt}
        />
      </Link>

      <div className="hsl-card pointer-events-none absolute bottom-0 h-1/3 w-full opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100" />
    </motion.div>
  );
};

export default PhotoCard;
