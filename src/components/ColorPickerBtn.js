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
      className={`relative z-20 text-left text-lg text-[var(--on-background)] 2xl:text-2xl ${
        pageSelected === "Videos" ? "hidden" : null
      }`}
    >
      <button
        onClick={() => {
          setSearchObj({ ...searchObj, color: "" });
          setColor({ hex: "#000000" });
        }}
        className="absolute right-2 top-0 z-10 flex h-full flex-row items-center justify-center"
      >
        {searchObj.color !== "#000000" && searchObj.color !== "" && (
          <IoMdClose className="z-10 h-5 w-auto 2xl:h-7" />
        )}
      </button>

      <button
        onClick={() => {
          setColorOpen(!colorOpen);
        }}
        className={`px-2 transition-colors duration-100 2xl:px-4 ${
          searchObj.color !== "#000000" && searchObj.color !== ""
            ? "bg-[var(--secondary-container)]"
            : "bg-[var(--background)]"
        } relative flex w-full flex-row items-center justify-start gap-2 rounded-md border-[1px] border-[var(--outline)]`}
      >
        <div className="flex flex-row items-center gap-1">
          {searchObj.color !== "#000000" &&
            searchObj.color !== "" &&
            !isMobileView && <GiCheckMark className="h-4 w-auto 2xl:h-6" />}
          <span>
            {searchObj.color !== "#000000" && searchObj.color !== ""
              ? searchObj.color
              : "Color"}
          </span>
        </div>
        <div className="grid h-4 w-4 place-content-center">
          {(searchObj.color === "#000000" || searchObj.color === "") && (
            <AiOutlineCaretDown className="h-3 w-auto 2xl:h-5" />
          )}
        </div>
      </button>
      {colorOpen && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ type: "tween", duration: 0.1 }}
          className="absolute top-[calc(100%+3px)] z-40 origin-top"
        >
          <ChromePicker
            className="absolute top-full z-40 translate-y-0.5"
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
