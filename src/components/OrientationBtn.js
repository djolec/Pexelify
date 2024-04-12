import React from "react";
import { ReactComponent as CloseIcon } from "../svg/x.svg";
import { ReactComponent as CaretDown } from "../svg/caret-down-outline.svg";
import { ReactComponent as CheckMark } from "../svg/check-mark.svg";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { closeButton } from "../utils/closeButton";

const OrientationBtn = ({ searchObj, setSearchObj }) => {
  const [orientationOpen, setOrientationOpen] = useState(false);
  const orientationRef = useRef();

  const values = ["Portrait", "Landscape", "Square"];

  useEffect(() => {
    document.addEventListener(
      "mousedown",
      closeButton(orientationRef, setOrientationOpen),
    );

    return () =>
      document.removeEventListener(
        "mousedown",
        closeButton(orientationRef, setOrientationOpen),
      );
  }, []);

  return (
    <div
      ref={orientationRef}
      className="relative z-10 flex w-fit flex-col gap-1 text-left text-lg text-[var(--on-background)] 2xl:text-2xl"
    >
      <button
        aria-label="choose orientation"
        onClick={() => setOrientationOpen((prev) => !prev)}
        className={`flex flex-row items-center gap-2 rounded-md border-[1px] border-[var(--outline)] px-2 ${
          searchObj.orientation
            ? "bg-[var(--secondary-container)]"
            : "bg-[var(--background)]"
        }`}
      >
        {searchObj.orientation && (
          <CheckMark className="hidden h-4 w-auto fill-[var(--on-background)] sm:block" />
        )}
        <span>
          {searchObj.orientation === "" ? "Orientation" : searchObj.orientation}
        </span>
        {!searchObj.orientation && (
          <CaretDown
            className={`h-5 w-auto translate-y-[2px] fill-[var(--on-background)] ${
              orientationOpen ? "rotate-180" : ""
            } transition-transform duration-200`}
          />
        )}
        {searchObj.orientation && (
          <CloseIcon
            onClick={(e) => {
              e.stopPropagation();
              setSearchObj({ ...searchObj, orientation: "" });
              setOrientationOpen(false);
            }}
            className="h-5 w-auto rounded-sm border-[1px] border-red-500"
          />
        )}
      </button>

      {orientationOpen && (
        <motion.ul
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1, transition: { type: "tween", duration: 0.1 } }}
          className="absolute top-[calc(100%+3px)] w-fit origin-top overflow-hidden rounded-md border-[1px] border-[var(--outline)] bg-[var(--background)]"
        >
          {values.map((value, index) => (
            <motion.li
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.1, delay: 0.1 },
              }}
              key={index}
            >
              <button
                onClick={() => {
                  setSearchObj({ ...searchObj, orientation: value });
                  setOrientationOpen(false);
                }}
                className="w-full px-3 text-left"
              >
                {value}
              </button>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default OrientationBtn;
