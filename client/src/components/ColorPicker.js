import React from "react";
import { useState, useContext, useRef, useEffect } from "react";
import { ChromePicker } from "react-color";
import { ReactComponent as CloseIcon } from "../svg/x.svg";
import { ReactComponent as CaretDown } from "../svg/caret-down-outline.svg";
import { ReactComponent as CheckMark } from "../svg/check-mark.svg";
import { motion } from "framer-motion";
import { closeButton } from "../utils/closeButton";

const ColorPicker = ({ searchObj, setSearchObj }) => {
  const colorRef = useRef(null);
  const [colorOpen, setColorOpen] = useState(false);
  const [color, setColor] = useState("");

  useEffect(() => {
    if (!colorOpen && color.hex !== "#000000" && color.hex !== undefined) {
      setSearchObj({ ...searchObj, color: `${color.hex}` });
    }
  }, [colorOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", closeButton(colorRef, setColorOpen));

    return () =>
      document.removeEventListener(
        "mousedown",
        closeButton(colorRef, setColorOpen),
      );
  }, []);

  return (
    <div
      ref={colorRef}
      className="relative z-10 flex w-fit flex-col gap-1 text-left text-lg text-[var(--on-background)] 2xl:text-3xl"
    >
      <button
        aria-label="pick color"
        onClick={() => setColorOpen((prev) => !prev)}
        className={`flex flex-row items-center gap-2 rounded-md border-[1px] border-[var(--outline)] px-2 2xl:px-3 2xl:py-1 ${
          searchObj.color
            ? "bg-[var(--secondary-container)]"
            : "bg-[var(--background)]"
        }`}
      >
        {searchObj.color && (
          <CheckMark className="hidden h-4 w-auto fill-[var(--on-background)] sm:block 2xl:h-6" />
        )}
        <span>{searchObj.color === "" ? "Color" : searchObj.color}</span>
        {!searchObj.color && (
          <CaretDown
            className={`h-5 w-auto translate-y-[2px] fill-[var(--on-background)] 2xl:h-7 ${
              colorOpen ? "rotate-180" : ""
            } transition-transform duration-200`}
          />
        )}
        {searchObj.color && (
          <CloseIcon
            onClick={(e) => {
              e.stopPropagation();
              setSearchObj({ ...searchObj, color: "" });
              setColor("#000000");
              setColorOpen(false);
            }}
            className="h-5 w-auto rounded-sm border-[1px] border-red-500 2xl:h-7"
          />
        )}
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

export default ColorPicker;
