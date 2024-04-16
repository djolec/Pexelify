import React from "react";
import { useState, useEffect, useRef } from "react";
import { ReactComponent as Download } from "../svg/download.svg";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { downloadMedia } from "../utils/downloadMedia";
import DownloadIndicator from "./DownloadIndicator";

const DownloadBtn = ({ data, id, setIsErrorDownloading }) => {
  const [downloadPercent, setDownloadPercent] = useState(null);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const location = useLocation();
  const downloadMenu = useRef(null);

  useEffect(() => {
    const handleDownloadMenu = (e) => {
      if (downloadMenu.current && !downloadMenu.current.contains(e.target)) {
        setDownloadOpen(false);
      }
    };

    document.addEventListener("mousedown", handleDownloadMenu);

    return () => document.removeEventListener("mousedown", handleDownloadMenu);
  }, []);

  return (
    <div ref={downloadMenu} className="relative flex flex-row gap-3">
      {downloadPercent !== null && (
        <DownloadIndicator downloadPercent={downloadPercent} />
      )}
      <button
        onClick={() => setDownloadOpen((prev) => !prev)}
        aria-label="download file"
        className="flex flex-row items-center gap-2 rounded-full bg-[var(--primary)] text-[var(--on-primary)] md:px-4 2xl:px-6"
      >
        <span className="hidden text-lg font-semibold md:block 2xl:text-4xl">
          Download
        </span>
        <Download className="h-10 w-auto px-2 py-2 md:px-0 md:py-2 2xl:h-[70px] 2xl:p-3" />
      </button>
      {downloadOpen && (
        <motion.ul
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 0.2 }}
          className={`absolute left-0 top-[calc(100%+4px)] z-20 flex w-36 origin-top translate-y-1 flex-col gap-0 overflow-hidden rounded-lg border-[1px] border-[var(--outline)] bg-[var(--background)] text-[var(--on-background)] md:w-full`}
        >
          {data.map(([key, value], index) => {
            return (
              <motion.li
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.2 }}
                className="w-full hover:bg-[var(--surface-variant)]"
              >
                <button
                  className="h-full w-full px-3 py-1 text-left text-lg 2xl:py-3 2xl:text-3xl"
                  onClick={() => {
                    downloadMedia(
                      value,
                      `${
                        location.pathname.includes("photos") ? "photo" : "video"
                      }_${id}_${key}`,
                      setDownloadPercent,
                      setIsErrorDownloading,
                      location.pathname.includes("photos") ? "jpeg" : "mp4",
                    );
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
  );
};

export default DownloadBtn;
