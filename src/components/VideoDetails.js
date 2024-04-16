import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchVideoById } from "../hooks/useFetchData";
import FavoriteBtn from "./FavoriteBtn";
import DownloadBtn from "./DownloadBtn";
import ThemeBtn from "./ThemeBtn";
import BackBtn from "./BackBtn";
import { motion } from "framer-motion";
import ReactPlayer from "react-player";

const VideoDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useFetchVideoById(id);
  const [isErrorDownloading, setIsErrorDownloading] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrorPlaying, setIsErrorPlaying] = useState(false);

  const {
    video_files,
    video_pictures,
    width,
    height,
    user: { name } = {},
  } = data?.data || {};

  const qualityLinkArray = video_files
    ?.sort((a, b) => a.width - b.width)
    .map(({ quality, link, width, height }) => [
      `${quality} ${width}x${height}`,
      link,
    ]);

  const mediaObj = {
    type: "Video",
    id: Number(id),
    width: width,
    height: height,
    src: video_files && video_files.length > 0 ? video_files[0].link : null,
    image:
      video_pictures && video_pictures.length > 0
        ? video_pictures[0].picture
        : null,
  };

  return (
    <div className="relative w-full flex-grow">
      <div className="flex h-20 flex-row items-center justify-between 2xl:h-28">
        <BackBtn />

        <div className="flex flex-row items-center gap-3">
          {isErrorDownloading && (
            <span className="text-lg text-[var(--on-background)]">
              {isErrorDownloading}
            </span>
          )}

          <DownloadBtn
            data={qualityLinkArray}
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
        <div className="flex flex-col items-center gap-2">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              backgroundColor: "#333",
              aspectRatio: `${width}/${height}`,
            }}
            className="relative h-auto w-full overflow-hidden
           rounded-2xl md:h-[70vh] md:w-auto"
          >
            {isErrorPlaying && (
              <h1 className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-white">
                Video resource could not be loaded.
              </h1>
            )}

            <motion.div
              className="h-full w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: isLoaded ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ReactPlayer
                config={{
                  file: { attributes: { controlsList: "nodownload" } },
                }}
                width="100%"
                height="100%"
                controls
                url={qualityLinkArray[qualityLinkArray.length - 3][1]}
                onReady={() => setIsLoaded(true)}
                onError={() => setIsErrorPlaying(true)}
              />
            </motion.div>
          </motion.div>

          <h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0 }}
            className="2xl:text-3xl"
          >
            <span className="text-[var(--on-background)]">Video by </span>
            <span className="font-semibold text-[var(--primary)]">{name}</span>
          </h1>
        </div>
      )}
    </div>
  );
};

export default VideoDetails;
