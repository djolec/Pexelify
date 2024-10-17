import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CheckMark from "../assets/svg/check-mark.svg?react";
import CaretDown from "../assets/svg/caret-down.svg?react";
import CloseIcon from "../assets/svg/x.svg?react";
import { ChromePicker } from "react-color";
import { motion } from "framer-motion";
import useClickOutside from "../hooks/useClickOutside";

const ColorPickerBtn = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [color, setColor] = useState(
    (searchParams.get("color") && "#" + searchParams.get("color")) || ""
  );
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef(null);
  useClickOutside(ref, setIsOpen);

  const fieldName = "Color";

  useEffect(() => {
    if (!isOpen && color !== "") {
      searchParams.set("color", color[0] === "#" ? color.slice(1) : color);
      setSearchParams(searchParams);
    }
  }, [isOpen, searchParams, color, setSearchParams]);

  const handleColorChange = (colorPicked) => {
    setColor(colorPicked.hex);
  };

  return (
    <div
      ref={ref}
      className="relative z-10 flex w-36 sm:w-fit flex-col gap-1 text-left text-lg text-[var(--on-background)] 2xl:text-3xl"
    >
      <button
        className={`flex flex-row items-center justify-between sm:justify-normal gap-2 rounded-md border-[1px] border-[var(--outline)] px-2 2xl:px-3 2xl:py-1 ${
          searchParams.get("color")
            ? "bg-[var(--secondary-container)]"
            : "bg-[var(--background)]"
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {searchParams.get("color") && (
          <CheckMark className="hidden h-4  w-auto fill-[var(--on-background)] sm:block 2xl:h-6" />
        )}

        <span>
          {searchParams.get("color")
            ? searchParams.get("color") && "#" + searchParams.get("color")
            : fieldName}
        </span>

        {!searchParams.get("color") && (
          <CaretDown
            className={`h-5 w-auto translate-y-[2px] fill-[var(--on-background)] 2xl:h-7 ${
              isOpen ? "rotate-180" : ""
            } transition-transform duration-200`}
          />
        )}

        {searchParams.get("color") && (
          <CloseIcon
            onClick={(e) => {
              e.stopPropagation();
              setColor("");
              searchParams.delete(fieldName.toLowerCase());
              setSearchParams(searchParams);
              setIsOpen(false);
            }}
            className="h-5 w-auto rounded-sm border-[1px] border-red-500 2xl:h-7"
          />
        )}
      </button>

      {isOpen && (
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
            onChange={handleColorChange}
            disableAlpha={true}
          />
        </motion.div>
      )}
    </div>
  );
};

export default ColorPickerBtn;
