import React from "react";
import { useEffect, useContext, useRef, useState } from "react";
import { AppContext } from "../App";
import { useParams } from "react-router-dom";
import { useFetchPhotoById } from "../Hooks/useFetchData";
import { motion } from "framer-motion";
import DetailsHeaderPhoto from "./DetailsHeaderPhoto";
import axios from "axios";
import { createContext } from "react";

export const DetailsContextPhoto = createContext();

const PhotoDetails = () => {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [percentCompleted, setPercentCompleted] = useState(null);
  const downloadMenuRef = useRef();
  const { setPageSelected, savedMedia, setSavedMedia, isMobileView } =
    useContext(AppContext);
  const { id } = useParams();
  const [isSaved, setIsSaved] = useState(null);

  const { data, isLoading } = useFetchPhotoById(id);

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
      type: "Photo",
      id: data.data.id,
      width: data.data.width,
      height: data.data.height,
      src: data.data.src.medium,
      avg_color: data.data.avg_color,
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

  const downloadImage = async (url, filename) => {
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
      console.error("Error downloading video:", error);
    }
  };

  return (
    <div>
      <DetailsContextPhoto.Provider
        value={{
          downloadMenuRef,
          downloadOpen,
          setDownloadOpen,
          isLoading,
          data,
          downloadImage,
          id,
          handleSaveMedia,
          isSaved,
          setIsSaved,
          percentCompleted,
        }}
      >
        <DetailsHeaderPhoto />
      </DetailsContextPhoto.Provider>
      <div className="flex-grow">
        {!isLoading && (
          <div className="flex flex-col items-center gap-2 pb-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0 }}
              style={{
                aspectRatio: `${data?.data.width}/${data?.data.height}`,
                backgroundColor: `${data?.data.avg_color}`,
              }}
              className={` ${
                isMobileView ? "w-full h-auto" : "h-[70vh] w-auto"
              } rounded-2xl overflow-hidden`}
            >
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
                className="h-full w-auto block"
                src={data?.data.src.large}
                alt=""
              />
            </motion.div>

            <h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0 }}
            >
              <span className="text-[var(--on-background)]">
                Photograph by{" "}
              </span>
              <span className="text-[var(--primary)] font-semibold">
                {data?.data.photographer}
              </span>
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoDetails;
