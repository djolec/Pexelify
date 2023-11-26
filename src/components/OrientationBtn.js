import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../App";
import { GiCheckMark } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { AiOutlineCaretDown } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

const OrientationBtn = () => {
  const [orientationOpen, setOrientationOpen] = useState(false);
  const orientationRef = useRef();

  const { searchObj, setSearchObj, isMobileView } = useContext(AppContext);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!orientationRef.current.contains(event.target))
        setOrientationOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={orientationRef}
      className="text-left relative z-10 text-[var(--on-background)]"
    >
      {searchObj.orientation !== "" && (
        <button className="absolute right-2 top-0 z-10 flex flex-row justify-center items-center h-full">
          <IoMdClose
            onClick={() => {
              setSearchObj({ ...searchObj, orientation: "" });
              setOrientationOpen(false);
            }}
            className="h-6 w- z-10"
          />
        </button>
      )}

      <button
        onClick={() => setOrientationOpen(!orientationOpen)}
        className={`px-2 ${
          searchObj.orientation
            ? "bg-[var(--secondary-container)]"
            : "bg-[var(--background)]"
        } relative w-full border-[1px] border-[var(--outline)] transition-colors duration-100 rounded-md flex flex-row gap-2 items-center justify-start `}
      >
        <div className="flex flex-row gap-1 items-center">
          {searchObj.orientation !== "" && !isMobileView && (
            <GiCheckMark className="h-4 w-auto" />
          )}
          <span>
            {searchObj.orientation ? searchObj.orientation : "Orientation"}
          </span>
        </div>
        <div className="h-4 w-4 grid place-content-center">
          {searchObj.orientation === "" && (
            <AiOutlineCaretDown className="h-3 w-auto" />
          )}
        </div>
      </button>

      {orientationOpen && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ type: "tween", duration: 0.1 }}
          className="bg-[var(--background)] origin-top py-1 border-[1px] border-[var(--outline)] absolute h-fit left-0 top-[27px] px-4 flex flex-col rounded-md z-20"
        >
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            onClick={() => {
              setSearchObj({ ...searchObj, orientation: "Portrait" });
              setOrientationOpen(false);
            }}
            className="text-left"
          >
            Portrait
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            onClick={() => {
              setSearchObj({ ...searchObj, orientation: "Landscape" });
              setOrientationOpen(false);
            }}
            className="text-left"
          >
            Landscape
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            onClick={() => {
              setSearchObj({ ...searchObj, orientation: "Square" });
              setOrientationOpen(false);
            }}
            className="text-left"
          >
            Square
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default OrientationBtn;
