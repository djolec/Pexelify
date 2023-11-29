import React from "react";
import { GiCheckMark } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { AiOutlineCaretDown } from "react-icons/ai";
import { ChromePicker } from "react-color";
import { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../App";
import { motion } from "framer-motion";

const ColorPickerBtn = () => {
  const [color, setColor] = useState("");
  const [colorOpen, setColorOpen] = useState(false);
  const colorRef = useRef();

  const { searchObj, setSearchObj, pageSelected, isMobileView } =
    useContext(AppContext);

  useEffect(() => {
    if (!colorOpen && color.hex !== "#000000" && color.hex !== undefined) {
      setSearchObj({ ...searchObj, color: `${color.hex}` });
    }
  }, [colorOpen]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!colorRef.current.contains(event.target)) setColorOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div
      ref={colorRef}
      className={`text-left text-lg 2xl:text-2xl relative z-20 text-[var(--on-background)] ${
        pageSelected === "Videos" ? "hidden" : null
      }`}
    >
      <button
        onClick={() => {
          setSearchObj({ ...searchObj, color: "" });
          setColor({ hex: "#000000" });
        }}
        className="absolute right-2 top-0 z-10 flex flex-row justify-center items-center h-full"
      >
        {searchObj.color !== "#000000" && searchObj.color !== "" && (
          <IoMdClose className="h-5 2xl:h-7 w-auto z-10" />
        )}
      </button>

      <button
        onClick={() => {
          setColorOpen(!colorOpen);
        }}
        className={`px-2 2xl:px-4 transition-colors duration-100 ${
          searchObj.color !== "#000000" && searchObj.color !== ""
            ? "bg-[var(--secondary-container)]"
            : "bg-[var(--background)]"
        } relative w-full border-[1px] border-[var(--outline)] rounded-md flex flex-row gap-2 items-center justify-start`}
      >
        <div className="flex flex-row gap-1 items-center">
          {searchObj.color !== "#000000" &&
            searchObj.color !== "" &&
            !isMobileView && <GiCheckMark className="h-4 2xl:h-6 w-auto" />}
          <span>
            {searchObj.color !== "#000000" && searchObj.color !== ""
              ? searchObj.color
              : "Color"}
          </span>
        </div>
        <div className="h-4 w-4 grid place-content-center">
          {(searchObj.color === "#000000" || searchObj.color === "") && (
            <AiOutlineCaretDown className="h-3 2xl:h-5 w-auto" />
          )}
        </div>
      </button>
      {colorOpen && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ type: "tween", duration: 0.1 }}
          className="absolute top-[calc(100%+3px)] origin-top z-40"
        >
          <ChromePicker
            className="absolute top-full translate-y-0.5 z-40"
            width={window.innerWidth < 1536 ? "160px" : "300px"}
            color={color}
            onChange={(updatedColor) => setColor(updatedColor)}
            disableAlpha={true}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ColorPickerBtn;
