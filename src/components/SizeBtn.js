import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../App";
import { GiCheckMark } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { AiOutlineCaretDown } from "react-icons/ai";
import { motion } from "framer-motion";

const SizeBtn = () => {
  const [sizeOpen, setSizeOpen] = useState(false);
  const sizeRef = useRef();

  const { searchObj, setSearchObj, isMobileView } = useContext(AppContext);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!sizeRef.current.contains(event.target)) setSizeOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={sizeRef}
      className={`text-left text-lg 2xl:text-2xl relative z-10 text-[var(--on-background)]`}
    >
      <button className="absolute right-2 top-0 z-10 flex flex-row justify-center items-center h-full">
        {searchObj.size !== "" && (
          <IoMdClose
            onClick={() => {
              setSearchObj({ ...searchObj, size: "" });
              setSizeOpen(false);
            }}
            className="h-6 2xl:h-7 w-auto z-10"
          />
        )}
      </button>

      <button
        onClick={() => setSizeOpen(!sizeOpen)}
        className={`px-2 2xl:px-4 ${
          searchObj.size
            ? "bg-[var(--secondary-container)]"
            : "bg-[var(--background)]"
        } relative w-full border-[1px] transition-colors duration-100 border-[var(--outline)] rounded-md flex flex-row gap-2 items-center justify-start`}
      >
        <div className="flex flex-row gap-1 items-center">
          {searchObj.size !== "" && !isMobileView && (
            <GiCheckMark className="h-4 2xl:h-6 w-auto" />
          )}
          <span>{searchObj.size ? searchObj.size : "Size"}</span>
        </div>
        <div className="h-4 w-4 grid place-content-center">
          {searchObj.size === "" && (
            <AiOutlineCaretDown className="h-3 2xl:h-5 w-auto" />
          )}
        </div>
      </button>

      {sizeOpen && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ type: "tween", duration: 0.1 }}
          className="bg-[var(--background)] py-1 border-[1px] border-[var(--outline)] absolute h-fit left-0 top-[calc(100%+3px)] origin-top px-4 flex z-20 flex-col rounded-md"
        >
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            onClick={() => {
              setSearchObj({ ...searchObj, size: "Small" });
              setSizeOpen(false);
            }}
            className="text-left 2xl:py-1"
          >
            Small
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            onClick={() => {
              setSearchObj({ ...searchObj, size: "Medium" });
              setSizeOpen(false);
            }}
            className="text-left 2xl:py-1"
          >
            Medium
          </motion.button>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1, delay: 0.1 }}
            onClick={() => {
              setSearchObj({ ...searchObj, size: "Large" });
              setSizeOpen(false);
            }}
            className="text-left 2xl:py-1"
          >
            Large
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default SizeBtn;
