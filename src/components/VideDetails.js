import React from "react";
import { useContext, useEffect, useRef, useState, createContext } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../App";
import { useFetchVideoById } from "../Hooks/useFetchData";
import ReactPlayer from "react-player";
import "react-circular-progressbar/dist/styles.css";
import DetailsHeaderVideo from "./DetailsHeaderVideo";
import { motion } from "framer-motion";
import axios from "axios";

export const DetailsContextVideo = createContext();

const VideDetails = () => {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [percentCompleted, setPercentCompleted] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isErrorDownloading, setIsErrorDownloading] = useState(null);
  const downloadMenuRef = useRef();
  const [isSaved, setIsSaved] = useState(null);
  const { setPageSelected, savedMedia, setSavedMedia, isMobileView } =
    useContext(AppContext);
  const { id } = useParams();

  const { data, isLoading } = useFetchVideoById(id);

  const sortedVideos = data?.data.video_files.sort((a, b) => a.width - b.width);

  useEffect(() => {
    setIsSaved(
      JSON.parse(localStorage.getItem("savedMedia")).some(
        (obj) => obj.id === parseInt(id)
      )
    );
  }, []);

  useEffect(() => {
    setPageSelected("Details");
  }, []);

  const handleSaveMedia = () => {
    const mediaObj = {
      type: "Video",
      id: data.data.id,
      width: data.data.width,
      height: data.data.height,
      src: sortedVideos[sortedVideos.length - 3].link,
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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!downloadMenuRef.current.contains(event.target))
        setDownloadOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const downloadVideo = async (url, filename) => {
    try {
      const response = await axios({
        method: "get",
        url: url,
        responseType: "blob",
        onDownloadProgress: (progressEvent) => {
          let percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setPercentCompleted(percentCompleted);
        },
      });

      const blob = response.data;
      const objectUrl = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = filename;
      link.click();

      URL.revokeObjectURL(objectUrl);

      setTimeout(() => {
        setPercentCompleted(null);
      }, 2000);
    } catch (error) {
      setIsErrorDownloading(`Error: ${error.response.statusText}`, error);
    }
  };

  return (
    <div>
      <DetailsContextVideo.Provider
        value={{
          downloadMenuRef,
          downloadOpen,
          setDownloadOpen,
          isLoading,
          data,
          downloadVideo,
          id,
          percentCompleted,
          sortedVideos,
          handleSaveMedia,
          isSaved,
          isErrorDownloading,
        }}
      >
        <DetailsHeaderVideo />
      </DetailsContextVideo.Provider>
      <div className="flex-grow">
        {!isLoading && (
          <div className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0 }}
              style={{
                backgroundColor: "#333",
                aspectRatio: `${data?.data.width}/${data?.data.height}`,
              }}
              className={`${
                isMobileView ? "w-full h-auto" : "h-[70vh] w-auto"
              } rounded-2xl overflow-hidden relative`}
            >
              {isError && (
                <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-2xl text-white">
                  Video resource could not be loaded.
                </h1>
              )}
              <motion.div
                className="h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <ReactPlayer
                  config={{
                    file: { attributes: { controlsList: "nodownload" } },
                  }}
                  width="100%"
                  height="100%"
                  controls
                  url={sortedVideos[sortedVideos.length - 3].link}
                  onReady={() => setIsLoaded(true)}
                  onError={() => setIsError(true)}
                />
              </motion.div>
            </motion.div>
            <h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0 }}
            >
              <span className="text-[var(--on-background)]">Video by </span>
              <span className="text-[var(--primary)] font-semibold">
                {data?.data.user.name}
              </span>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideDetails;
