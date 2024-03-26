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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.1 } }}
      className="z-30 flex h-20 w-full flex-row items-center justify-between px-0 2xl:h-28"
    >
      <BackBtn />

      <div className="flex flex-row items-center gap-3">
        <div className="flex h-10 w-auto flex-row items-center">
          {isErrorDownloading && (
            <h2 className="text-lg text-[var(--on-background)]">
              {isErrorDownloading}
            </h2>
          )}
        </div>

        {percentCompleted !== null && !isErrorDownloading && (
          <div className="h-10 w-10 2xl:h-14 2xl:w-14">
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
            } flex flex-row items-center justify-center gap-2 rounded-full bg-[var(--primary)] text-[var(--on-primary)]`}
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
              className={`absolute left-0 top-[calc(100%+4px)] z-20 flex w-36 origin-top translate-y-1 flex-col gap-0 overflow-hidden rounded-lg border-[1px] border-[var(--outline)] bg-[var(--background)] text-[var(--on-background)] 2xl:w-44`}
            >
              {!isLoading &&
                sortedVideos.map((file, index) => {
                  return (
                    <motion.li
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className="w-full hover:bg-[var(--surface-variant)]"
                      key={index}
                    >
                      <button
                        onClick={() => {
                          downloadVideo(
                            file.link,
                            `video_${id}_${file.width}x${file.height}`,
                          );
                          setDownloadOpen(false);
                        }}
                        className="h-full w-full px-3 py-1 text-left text-lg 2xl:text-2xl"
                      >
                        {file.quality} {file.width}x{file.height}
                      </button>
                    </motion.li>
                  );
                })}
            </motion.ul>
          )}
        </div>

        <div className="flex flex-row items-center rounded-full bg-[var(--surface)] transition-colors duration-100 hover:bg-[var(--surface-variant)]">
          {!isSaved && (
            <motion.button
              onClick={handleSaveMedia}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="text-[var(--on-background)]"
            >
              <PiHeartStraightBold className="h-10 w-auto p-2 2xl:h-12" />
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
              <PiHeartStraightFill className=" h-10 w-auto p-2 2xl:h-12" />
            </motion.button>
          )}
        </div>
        <ThemeBtn />
      </div>
    </motion.div>
  );
};

export default DetailsHeaderVideo;
