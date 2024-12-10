import { memo, useRef, useState } from "react";
import PlayIcon from "../assets/svg/play.svg?react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FavoriteBtn from "./FavoriteBtn";

const VideoCard = memo(
  ({
    source,
    cardWidth,
    cardHeight,
    videoID,
    videoImg,
    isMobile,
    isSaved,
    addVideo,
    removeVideo,
  }) => {
    const videoRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const newVideo = {
      id: videoID,
      width: cardWidth,
      height: cardHeight,
      src: source,
      image: videoImg,
    };

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
        <div className="absolute bottom-2 right-2 z-10 2xl:bottom-6 2xl:right-6">
          <FavoriteBtn
            add={() => addVideo(newVideo)}
            remove={() => removeVideo(isSaved._id)}
            isSaved={isSaved}
          />
        </div>

        <div className="absolute left-4 top-4 z-10 overflow-hidden rounded-md text-black opacity-100 md:transition-opacity md:duration-200 md:group-hover:opacity-0">
          <PlayIcon className="h-5 w-auto bg-[#ffddb5] p-1 2xl:h-9" />
        </div>

        <Link
          aria-label={`View video ${videoID}`}
          to={`/videos/details/${videoID}`}
        >
          {isMobile ? (
            <div
              className="h-full w-full bg-cover"
              style={{ backgroundImage: `url(${videoImg})` }}
            />
          ) : (
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              height={cardHeight}
              width={cardWidth}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              ref={videoRef}
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
  },
);

VideoCard.displayName = "VideoCard";

export default VideoCard;
