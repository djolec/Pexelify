import { useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import CheckMark from "../assets/svg/check-mark.svg?react";
import CaretDown from "../assets/svg/caret-down.svg?react";
import CloseIcon from "../assets/svg/x.svg?react";
import { motion } from "framer-motion";
import useClickOutside from "../hooks/useClickOutside";

const FilterBtn = ({ fieldData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fieldName, fieldOptions] = Object.entries(fieldData)[0];
  const paramValue = searchParams.get(fieldName?.toLowerCase());
  const capitalizedParamValue =
    paramValue?.charAt(0).toUpperCase() + paramValue?.slice(1);

  const [value, setValue] = useState(capitalizedParamValue || "");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useClickOutside(ref, setIsOpen);

  return (
    <div
      ref={ref}
      className={`relative sm:z-10 flex w-36 sm:w-fit flex-col gap-1 text-left text-lg text-[var(--on-background)] 2xl:text-3xl ${
        isOpen ? "z-40" : ""
      }`}
    >
      <button
        className={`flex flex-row items-center justify-between sm:justify-normal gap-2 rounded-md border-[1px] border-[var(--outline)] px-2 2xl:px-3 2xl:py-1 ${
          value ? "bg-[var(--secondary-container)]" : "bg-[var(--background)]"
        }`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {value && (
          <CheckMark className="hidden h-4  w-auto fill-[var(--on-background)] sm:block 2xl:h-6" />
        )}

        <span>{value ? value : fieldName}</span>

        {!value && (
          <CaretDown
            className={`h-5 w-auto translate-y-[2px] fill-[var(--on-background)] 2xl:h-7 ${
              isOpen ? "rotate-180" : ""
            } transition-transform duration-200`}
          />
        )}

        {value && (
          <CloseIcon
            onClick={(e) => {
              e.stopPropagation();
              setValue("");
              searchParams.delete(fieldName.toLowerCase());
              setSearchParams(searchParams);
              setIsOpen(false);
            }}
            className="h-5 w-auto rounded-sm border-[1px] border-red-500 2xl:h-7"
          />
        )}
      </button>

      {isOpen && (
        <motion.ul
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1, transition: { type: "tween", duration: 0.1 } }}
          className="absolute top-[calc(100%+3px)] w-fit origin-top overflow-hidden rounded-md border-[1px] border-[var(--outline)] bg-[var(--background)]"
        >
          {fieldOptions.map((value, index) => (
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
                  setValue(value);
                  searchParams.set(
                    fieldName.toLocaleLowerCase(),
                    value.toLowerCase()
                  );
                  setSearchParams(searchParams);
                  setIsOpen(false);
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

export default FilterBtn;
