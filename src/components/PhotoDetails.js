import React from "react";
import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { useFetchPhotoById } from "../hooks/useFetchData";
import FavoriteBtn from "./FavoriteBtn";
import DownloadBtn from "./DownloadBtn";
import ThemeBtn from "./ThemeBtn";
import BackBtn from "./BackBtn";
import { motion } from "framer-motion";

const PhotoDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useFetchPhotoById(id);
  const [isErrorDownloading, setIsErrorDownloading] = useState("");
  const {
    src,
    src: { medium } = {},
    src: { large } = {},
    alt,
    height,
    width,
    photographer,
    avg_color,
  } = data?.data || {};

  const mediaObj = {
    type: "Photo",
    id: Number(id),
    width: width,
    height: height,
    src: medium,
    avg_color: avg_color,
    alt: alt,
  };

  let srcArray = [];
  if (src) {
    srcArray = Object.entries(src).map(([key, value]) => [key, value]);
  }

  return (
    <div className="relative w-full flex-grow">
      <div className="flex h-20 flex-row items-center justify-between 2xl:h-32">
        <BackBtn />

        <div className="flex flex-row items-center gap-3">
          {isErrorDownloading && (
            <span className="text-lg text-[var(--on-background)]">
              {isErrorDownloading}
            </span>
          )}

          <DownloadBtn
            data={srcArray}
            id={id}
            setIsErrorDownloading={setIsErrorDownloading}
          />
          <FavoriteBtn mediaObj={mediaObj} />
          <ThemeBtn />
        </div>
      </div>

      {isLoading && (
        <span className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-[var(--on-background)] 2xl:text-5xl">
          Loading...
        </span>
      )}

      {isError && (
        <h1 className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-[var(--on-background)]">
          {error.message}
        </h1>
      )}

      {data?.data && (
        <div className="flex flex-col items-center gap-2 pb-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              aspectRatio: `${width}/${height}`,
              backgroundColor: `${avg_color}`,
            }}
            className="h-auto w-full  overflow-hidden rounded-2xl
        md:h-[70vh] md:w-auto"
          >
            <motion.img
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="block h-full w-full"
              src={large}
              alt={alt}
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="2xl:text-3xl"
          >
            <span className="text-[var(--on-background)]">Photograph by </span>
            <span className="font-semibold text-[var(--primary)]">
              {photographer}
            </span>
          </motion.h1>
        </div>
      )}
    </div>
  );
};

export default PhotoDetails;
