import React, { useLayoutEffect } from "react";
import { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LiaVideoSolid } from "react-icons/lia";
import { MdInsertPhoto } from "react-icons/md";
import { PiClockCounterClockwise } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import { HiArrowLeft } from "react-icons/hi";
import { useContext, useRef } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MobileSearchBar = () => {
  const searchRef = useRef(null);
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || []
  );

  useEffect(() => {
    if (localStorage.getItem("searchHistory")) {
      setHistory(JSON.parse(localStorage.getItem("searchHistory")));
    } else {
      localStorage.setItem("searchHistory", JSON.stringify([]));
    }
  }, []);

  const {
    inputValue,
    setInputValue,
    photosOrVideos,
    setPhotosOrVideos,
    setSearchBarOpen,
    setPageSelected,
    setMobSearchBar,
  } = useContext(AppContext);

  const handleSearchHistory = () => {
    if (inputValue) {
      if (history.some((historyItem) => historyItem === inputValue)) {
        return null;
      } else {
        if (history.length > 4) {
          const newHistory = history.slice(1);
          setHistory([...newHistory, inputValue]);
          localStorage.setItem(
            "searchHistory",
            JSON.stringify([...newHistory, inputValue])
          );
        } else {
          setHistory([...history, inputValue]);
          localStorage.setItem(
            "searchHistory",
            JSON.stringify([...history, inputValue])
          );
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className={`w-full z-50 fixed top-0 left-0 h-screen bg-[var(--surface-container-high)] lg:hidden`}
    >
      <button
        onClick={() => setMobSearchBar(false)}
        className="absolute top-0 left-4 h-16 text-[var(--on-background)]"
      >
        <HiArrowLeft className="h-6 w-auto" />
      </button>
      <div className="absolute top-0 right-4 h-16 flex flex-row items-center gap-1">
        <button
          className={`${inputValue ? "block" : "hidden"} text-gray-600`}
          onClick={() => setInputValue("")}
        >
          <IoCloseOutline className="h-8 w-auto" />
        </button>
        <Link to={`/media/${photosOrVideos.toLowerCase()}/${inputValue}`}>
          <button
            ref={searchRef}
            onClick={() => {
              handleSearchHistory();
              setPageSelected(photosOrVideos);
              setMobSearchBar(false);
            }}
            disabled={!inputValue}
          >
            <FaMagnifyingGlass
              className={`${
                inputValue ? "text-green-600" : "text-gray-600"
              } h-5 w-auto transition-colors duration-150 translate-y-[2px]`}
            />
          </button>
        </Link>
      </div>
      <input
        onClick={() => setSearchBarOpen(true)}
        onFocus={() => setSearchBarOpen(true)}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            searchRef.current.click();
          }
        }}
        className={`bg-[var(--surface-container-high)] text-lg border-b-[1px] border-gray-500 text-[var(--on-background)] h-16 w-full outline-none pr-14 pl-14`}
        type="text"
        value={inputValue}
        placeholder={
          photosOrVideos === "Photos"
            ? "Search for photos"
            : "Search for videos"
        }
      />
      <div
        className={`bg-[var(--surface-container-high)] top-16 left-0 absolute w-full`}
      >
        <div className="py-4 px-2 border-b-[1px] border-gray-500 flex flex-row text-[var(--on-background)] text-xl">
          <button
            onClick={() => setPhotosOrVideos("Photos")}
            className={`w-1/2 rounded-l-full py-1 border-[1px] border-gray-500 flex flex-row items-center justify-center gap-2 ${
              photosOrVideos === "Photos"
                ? "bg-[var(--secondary-container)]"
                : null
            }`}
          >
            <MdInsertPhoto className="h-7 w-auto" />
            <span>Photos</span>
          </button>
          <button
            onClick={() => setPhotosOrVideos("Videos")}
            className={`w-1/2 rounded-r-full py-1 border-[1px] border-gray-500 border-l-0 flex flex-row items-center justify-center gap-2 ${
              photosOrVideos === "Videos"
                ? "bg-[var(--secondary-container)]"
                : null
            }`}
          >
            <LiaVideoSolid className="h-7 w-auto" />
            <span>Videos</span>
          </button>
        </div>
        {history.length > 0 && (
          <ul className="w-full text-[var(--on-background)]">
            {history
              .slice()
              .reverse()
              .map((item, index) => {
                return (
                  <Link
                    key={index}
                    to={`/media/${photosOrVideos.toLowerCase()}/${item}`}
                  >
                    <li
                      onClick={() => {
                        setInputValue(item);
                        setMobSearchBar(false);
                      }}
                      className="w-full text-left cursor-pointer px-2 py-2 flex flex-row items-center justify-start gap-3 hover:bg-[var(--surface-container-highest)]"
                    >
                      <PiClockCounterClockwise className="h-6 w-auto" />
                      <span className="text-lg">{item}</span>
                    </li>
                  </Link>
                );
              })}
          </ul>
        )}
      </div>
    </motion.div>
  );
};

export default MobileSearchBar;
