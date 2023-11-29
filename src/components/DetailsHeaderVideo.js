import React from "react";
import BackBtn from "./BackBtn";
import ThemeBtn from "./ThemeBtn";
import { useContext } from "react";
import { DetailsContextVideo } from "./VideDetails";
import { AppContext } from "../App";
import { PiHeartStraightBold, PiHeartStraightFill } from "react-icons/pi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { motion } from "framer-motion";

const DetailsHeaderVideo = () => {
  const {
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
  } = useContext(DetailsContextVideo);

  const { isMobileView } = useContext(AppContext);

  return (
    <div className="h-20 2xl:h-28 z-30 flex flex-row items-center px-0 justify-between w-full">
      <BackBtn />

      <div className="flex flex-row items-center gap-3">
        <div className="h-10 w-auto flex flex-row items-center">
          {isErrorDownloading && (
            <h2 className="text-[var(--on-background)] text-lg">
              {isErrorDownloading}
            </h2>
          )}
        </div>

        {percentCompleted !== null && !isErrorDownloading && (
          <div className="w-10 h-10 2xl:w-14 2xl:h-14">
            <CircularProgressbar
              value={percentCompleted}
              text={`${percentCompleted}%`}
              styles={buildStyles({
                textSize: "28px",
                textColor: "var(--primary)",
                pathColor: "var(--primary)",
                trailColor: "var(--background)",
              })}
            />
          </div>
        )}

        <div
          ref={downloadMenuRef}
          className={`${!isMobileView ? "w-32 2xl:w-44" : null} relative`}
        >
          <button
            onClick={() => setDownloadOpen(!downloadOpen)}
            className={`relative h-9 2xl:h-11 ${
              isMobileView ? "w-9" : "w-full"
            } bg-[var(--primary)] text-[var(--on-primary)] rounded-full flex flex-row items-center gap-2 justify-center`}
          >
            {!isMobileView && <div className="2xl:text-2xl">Download</div>}
            <div>
              <PiDownloadSimpleBold
                className={`${isMobileView ? "h-5" : "h-4 2xl:h-6"} w-auto`}
              />
            </div>
          </button>
          {downloadOpen && (
            <motion.ul
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ type: "tween", duration: 0.2 }}
              className={`absolute origin-top w-36 2xl:w-44 top-[calc(100%+4px)] left-0 border-[1px] border-[var(--outline)] bg-[var(--background)] flex flex-col z-20 gap-0 translate-y-1 rounded-lg overflow-hidden text-[var(--on-background)]`}
            >
              {!isLoading &&
                sortedVideos.map((file, index) => {
                  return (
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className="hover:bg-[var(--surface-variant)] w-full"
                      key={index}
                    >
                      <button
                        onClick={() => {
                          downloadVideo(
                            file.link,
                            `video_${id}_${file.width}x${file.height}`
                          );
                          setDownloadOpen(false);
                        }}
                        className="py-1 px-3 w-full h-full text-left text-lg 2xl:text-2xl"
                      >
                        {file.quality} {file.width}x{file.height}
                      </button>
                    </motion.li>
                  );
                })}
            </motion.ul>
          )}
        </div>

        <div className="flex flex-row items-center bg-[var(--surface)] hover:bg-[var(--surface-variant)] rounded-full transition-colors duration-100">
          {!isSaved && (
            <motion.button
              onClick={handleSaveMedia}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-[var(--on-background)]"
            >
              <PiHeartStraightBold className="h-10 2xl:h-12 w-auto p-2" />
            </motion.button>
          )}
          {isSaved && (
            <motion.button
              onClick={handleSaveMedia}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-[var(--on-background)]"
            >
              <PiHeartStraightFill className="h-10 2xl:h-12 w-auto p-2" />
            </motion.button>
          )}
        </div>
        <ThemeBtn />
      </div>
    </div>
  );
};

export default DetailsHeaderVideo;
