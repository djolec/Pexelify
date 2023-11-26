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
        ])
      );
    } else {
      setIsSaved(false);
      setSavedMedia(savedMedia.filter((obj) => obj.id !== mediaObj.id));
      localStorage.setItem(
        "savedMedia",
        JSON.stringify(
          JSON.parse(localStorage.getItem("savedMedia")).filter(
            (obj) => obj.id !== mediaObj.id
          )
        )
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0 }}
      style={{
        backgroundColor: "#333",
        aspectRatio: `${cardWidth}/${cardHeight}`,
      }}
      className="overflow-hidden rounded-2xl relative bg-cover bg-center cursor-pointer"
    >
      {isHovered && !isSaved && (
        <motion.button
          onClick={handleSaveMedia}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-4 right-4 z-20 text-white"
        >
          <PiHeartStraightBold className="h-5 w-auto" />
        </motion.button>
      )}
      {isSaved && (
        <motion.button
          onClick={handleSaveMedia}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-4 right-4 z-20 text-white"
        >
          <PiHeartStraightFill className="h-5 w-auto" />
        </motion.button>
      )}
      {(!isHovered || isMobileView) && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute top-4 left-4 text-black rounded-md overflow-hidden"
        >
          <HiOutlinePlay className="h-5 w-auto p-1 bg-[#ffddb5]" />
        </motion.div>
      )}
      <Link to={`/media/video/${videoID}`}>
        {isMobileView && (
          <motion.img
            className="w-full h-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            // width="200px"
            // height="200px"
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
            className="w-full h-full object-fill"
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
          className="absolute h-1/3 w-full bottom-0 hsl-card pointer-events-none"
        ></motion.div>
      )}
    </motion.div>
  );
};

export default VideoCard;
