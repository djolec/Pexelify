import React, { useEffect } from "react";
import "../style.css";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { PiHeartStraightBold, PiHeartStraightFill } from "react-icons/pi";
import { useState, useContext } from "react";
import { AppContext } from "../App";

const PhotoCard = ({ source, bgColor, photoWidth, photoHeight, photoID }) => {
  const { savedMedia, setSavedMedia, isMobileView } = useContext(AppContext);
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(null);

  useEffect(() => {
    setIsSaved(savedMedia.some((obj) => obj.id === photoID));
  }, []);

  useEffect(() => {
    if (isMobileView) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }, [isMobileView]);

  const handleSaveMedia = () => {
    const mediaObj = {
      type: "Photo",
      id: photoID,
      width: photoWidth,
      height: photoHeight,
      src: { medium: source },
      avg_color: bgColor,
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
            onMouseOver: () => setIsHovered(true),
            onMouseLeave: () => setIsHovered(false),
          }
        : {})}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0 }}
      className="overflow-hidden relative w-full rounded-2xl"
      style={{
        backgroundColor: `${bgColor}`,
        aspectRatio: `${photoWidth}/${photoHeight}`,
      }}
    >
      {isHovered && !isSaved && (
        <motion.button
          onClick={handleSaveMedia}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-2 2xl:bottom-6 right-2 2xl:right-6 z-10 text-white h-10 w-10 grid place-content-center"
        >
          <PiHeartStraightBold className="h-6 2xl:h-10 w-auto" />
        </motion.button>
      )}
      {isSaved && (
        <motion.button
          onClick={handleSaveMedia}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-2 2xl:bottom-6 right-2 2xl:right-6 z-10 text-white h-10 w-10 grid place-content-center"
        >
          <PiHeartStraightFill className="h-6 2xl:h-10 w-auto" />
        </motion.button>
      )}
      <Link
        to={`/media/photo/${photoID}`}
        className="w-full h-full cursor-pointer"
      >
        <motion.img
          className="w-full h-full cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          width="200px"
          height="200px"
          src={source}
          loading="lazy"
          alt=""
        />
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

export default PhotoCard;
