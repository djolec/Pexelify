import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FavoriteBtn from "./FavoriteBtn";
import { memo } from "react";

const PhotoCard = memo(
  ({
    source,
    bgColor,
    photoWidth,
    photoHeight,
    photoID,
    alt,
    isSaved,
    addPhoto,
    removePhoto,
  }) => {
    const newPhoto = {
      id: photoID,
      width: photoWidth,
      height: photoHeight,
      src: source,
      avg_color: bgColor,
      alt: alt,
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
        <div className="absolute bottom-2 right-2 z-10 2xl:bottom-6 2xl:right-6">
          <FavoriteBtn
            add={() => addPhoto(newPhoto)}
            remove={() => removePhoto(isSaved._id)}
            isSaved={isSaved}
          />
        </div>

        <Link
          aria-label={`View photo ${alt}`}
          to={`/photos/details/${photoID}`}
          className="h-full w-full cursor-pointer"
        >
          <motion.img
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="h-full w-full"
            src={source}
            loading="lazy"
            alt={alt}
          />
        </Link>

        <div className="hsl-card pointer-events-none absolute bottom-0 h-1/3 w-full opacity-100 md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-100" />
      </motion.div>
    );
  },
);

PhotoCard.displayName = "PhotoCard";

export default PhotoCard;
