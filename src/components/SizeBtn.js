import React from "react";
import { ReactComponent as CloseIcon } from "../svg/x.svg";
import { ReactComponent as CaretDown } from "../svg/caret-down-outline.svg";
import { ReactComponent as CheckMark } from "../svg/check-mark.svg";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { closeButton } from "../utils/closeButton";

const SizeBtn = ({ searchObj, setSearchObj }) => {
  const [sizeOpen, setSizeOpen] = useState(false);
  const sizeRef = useRef();

  const values = ["Small", "Medium", "Large"];

  useEffect(() => {
    document.addEventListener("mousedown", closeButton(sizeRef, setSizeOpen));

    return () =>
      document.removeEventListener(
        "mousedown",
        closeButton(sizeRef, setSizeOpen),
      );
  }, []);

  return (
    <div
      ref={sizeRef}
      className="relative z-10 flex w-fit flex-col gap-1 text-left text-lg text-[var(--on-background)] 2xl:text-3xl"
    >
      <button
        aria-label="choose size"
        onClick={() => setSizeOpen((prev) => !prev)}
        className={`flex flex-row items-center gap-2 rounded-md border-[1px] border-[var(--outline)] px-2 2xl:px-3 2xl:py-1 ${
          searchObj.size
            ? "bg-[var(--secondary-container)]"
            : "bg-[var(--background)]"
        }`}
      >
        {searchObj.size && (
          <CheckMark className="hidden h-4 w-auto fill-[var(--on-background)] sm:block 2xl:h-6" />
        )}
        <span>{searchObj.size === "" ? "Size" : searchObj.size}</span>
        {!searchObj.size && (
          <CaretDown
            className={`h-5 w-auto translate-y-[2px] fill-[var(--on-background)] 2xl:h-7 ${
              sizeOpen ? "rotate-180" : ""
            } transition-transform duration-200`}
          />
        )}
        {searchObj.size && (
          <CloseIcon
            onClick={(e) => {
              e.stopPropagation();
              setSearchObj({ ...searchObj, size: "" });
              setSizeOpen(false);
            }}
            className="h-5 w-auto rounded-sm border-[1px] border-red-500 2xl:h-7"
          />
        )}
      </button>

      {sizeOpen && (
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
                  setSearchObj({ ...searchObj, size: value });
                  setSizeOpen(false);
                }}
                className="w-full px-3 text-left 2xl:py-1"
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

export default SizeBtn;
