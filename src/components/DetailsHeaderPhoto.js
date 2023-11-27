import React from "react";
import BackBtn from "./BackBtn";
import ThemeBtn from "./ThemeBtn";
import { useContext } from "react";
import { DetailsContextPhoto } from "./PhotoDetails";
import { AppContext } from "../App";
import { PiHeartStraightBold, PiHeartStraightFill } from "react-icons/pi";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { PiDownloadSimpleBold } from "react-icons/pi";
import { motion } from "framer-motion";

const DetailsHeaderPhoto = () => {
  const {
    downloadMenuRef,
    downloadOpen,
    setDownloadOpen,
    isLoading,
    data,
    downloadImage,
    id,
    handleSaveMedia,
    isSaved,
    percentCompleted,
  } = useContext(DetailsContextPhoto);

  const { isMobileView } = useContext(AppContext);

  return (
    <div className="h-20 z-30 flex flex-row items-center px-0 justify-between w-full">
      <BackBtn />

      <div className="flex flex-row items-center gap-3">
        {percentCompleted !== null && (
          <div className="w-10 h-10">
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
          className={`${!isMobileView ? "w-32" : null} relative`}
        >
          <button
            onClick={() => setDownloadOpen(!downloadOpen)}
            className={`relative h-9 ${
              isMobileView ? "w-9" : "w-full"
            } bg-[var(--primary)] text-[var(--on-primary)] rounded-full flex flex-row items-center gap-2 justify-center`}
          >
            {!isMobileView && <div>Download</div>}

            <div>
              <PiDownloadSimpleBold
                className={`${isMobileView ? "h-5" : "h-4"} w-auto`}
              />
            </div>
          </button>
          {downloadOpen && (
            <motion.ul
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ type: "tween", duration: 0.2 }}
              className={`absolute w-36 origin-top ${
                isMobileView ? "top-[40px]" : "top-[38px]"
              }  left-0 border-[1px] border-[var(--outline)] bg-[var(--background)] flex flex-col z-20 gap-0 translate-y-1 rounded-lg overflow-hidden text-[var(--on-background)]`}
            >
              {!isLoading &&
                Object.entries(data?.data.src).map(([key, value], index) => {
                  return (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: 0.2 }}
                      className="hover:bg-[var(--surface-variant)] w-full"
                    >
                      <button
                        className="py-1 px-3 w-full h-full text-left text-lg"
                        onClick={() => {
                          downloadImage(value, `photo_${id}_${key}`);
                          setDownloadOpen(false);
                        }}
                      >
                        {key}
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
              <PiHeartStraightBold className="h-10 w-auto p-2" />
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
              <PiHeartStraightFill className="h-10 w-auto p-2" />
            </motion.button>
          )}
        </div>
        <ThemeBtn />
      </div>
    </div>
  );
};

export default DetailsHeaderPhoto;
