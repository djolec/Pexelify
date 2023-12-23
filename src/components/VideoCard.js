import React from "react";
import "../style.css";
import { useRef, useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { motion } from "framer-motion";
import { HiOutlinePlay } from "react-icons/hi2";
import { PiHeartStraightBold, PiHeartStraightFill } from "react-icons/pi";
import { Link } from "react-router-dom";

const VideoCard = ({ source, cardWidth, cardHeight, videoID, videoImg }) => {
  const videoRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(null);
  const { savedMedia, setSavedMedia, isMobileView } = useContext(AppContext);

  useEffect(() => {
    if (isMobileView) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }, [isMobileView]);

  useEffect(() => {
    setIsSaved(savedMedia.some((obj) => obj.id === videoID));
  }, []);

  const handleMouseOver = () => {
    if (isLoaded) {
      videoRef.current.play();
      setIsHovered(true);
    }
  };

  const handleMouseOut = () => {
    if (isLoaded) {
      videoRef.current.pause();
      setIsHovered(false);
    }
  };

  const handleSaveMedia = () => {
    const mediaObj = {
      type: "Video",
      id: videoID,
      width: cardWidth,
      height: cardHeight,
      src: source,
      image: videoImg,
    };
    const exists = savedMedia.some((obj) => obj.id === mediaObj.id);
    if (!exists) {
      setIsSaved(true);
      setSavedMedia([...savedMedia, mediaObj]);
      localStorage.setItem(
        "savedMedia",
        JSON.stringify([
          ...JSON.parse(localStorage.getItem("savedMedia")),
          mediaObj,
        ]),
      );
    } else {
      setIsSaved(false);
      setSavedMedia(savedMedia.filter((obj) => obj.id !== mediaObj.id));
      localStorage.setItem(
        "savedMedia",
        JSON.stringify(
          JSON.parse(localStorage.getItem("savedMedia")).filter(
            (obj) => obj.id !== mediaObj.id,
          ),
        ),
      );
    }
  };

  return (
    <motion.div
      {...(!isMobileView
        ? {
            onMouseOver: () => handleMouseOver(),
            onMouseLeave: () => handleMouseOut(),
          }
        : {})}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0 }}
      style={{
        backgroundColor: "#333",
        aspectRatio: `${cardWidth}/${cardHeight}`,
      }}
      className="relative cursor-pointer overflow-hidden rounded-2xl bg-cover bg-center"
    >
      {isHovered && !isSaved && (
        <motion.button
          onClick={handleSaveMedia}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-2 right-2 z-10 grid h-10 w-10 place-content-center text-white 2xl:bottom-6 2xl:right-6"
        >
          <PiHeartStraightBold className="h-6 w-auto 2xl:h-10" />
        </motion.button>
      )}
      {isSaved && (
        <motion.button
          onClick={handleSaveMedia}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-2 right-2 z-10 grid h-10 w-10 place-content-center text-white 2xl:bottom-6 2xl:right-6"
        >
          <PiHeartStraightFill className="h-6 w-auto 2xl:h-10" />
        </motion.button>
      )}
      {(!isHovered || isMobileView) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute left-4 top-4 overflow-hidden rounded-md text-black"
        >
          <HiOutlinePlay className="h-5 w-auto bg-[#ffddb5] p-1 2xl:h-9" />
        </motion.div>
      )}
      <Link to={`/media/video/${videoID}`}>
        {isMobileView && (
          <motion.img
            className="h-full w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            src={videoImg}
            loading="lazy"
            alt=""
          />
        )}
        {!isMobileView && (
          <motion.video
            ref={videoRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: isLoaded ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="h-full w-full object-fill"
            loop={true}
            preload="metadata"
            muted
            onLoadedData={() => setIsLoaded(true)}
          >
            <source src={source} type="video/mp4" />
          </motion.video>
        )}
      </Link>
      {isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="hsl-card pointer-events-none absolute bottom-0 h-1/3 w-full"
        ></motion.div>
      )}
    </motion.div>
  );
};

export default VideoCard;
