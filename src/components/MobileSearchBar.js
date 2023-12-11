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
    JSON.parse(localStorage.getItem("searchHistory")) || [],
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

  const handleHistoryOrder = (clickedItem) => {
    const newHistory = history.filter((item) => item !== clickedItem);
    setHistory([clickedItem, ...newHistory]);
    localStorage.setItem(
      "searchHistory",
      JSON.stringify([clickedItem, ...newHistory]),
    );
  };

  const handleSearchHistory = () => {
    if (inputValue) {
      if (history.some((historyItem) => historyItem === inputValue)) {
        return null;
      } else {
        if (history.length > 4) {
          const newHistory = history.slice(0, history.length - 1);
          setHistory([inputValue, ...newHistory]);
          localStorage.setItem(
            "searchHistory",
            JSON.stringify([inputValue, ...newHistory]),
          );
        } else {
          setHistory([inputValue, ...history]);
          localStorage.setItem(
            "searchHistory",
            JSON.stringify([inputValue, ...history]),
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
      className={`fixed left-0 top-0 z-50 h-screen w-full bg-[var(--surface-container-high)] lg:hidden`}
    >
      <button
        onClick={() => setMobSearchBar(false)}
        className="absolute left-4 top-0 h-16 text-[var(--on-background)]"
      >
        <HiArrowLeft className="h-6 w-auto" />
      </button>
      <div className="absolute right-4 top-0 flex h-16 flex-row items-center gap-1">
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
              } h-5 w-auto translate-y-[2px] transition-colors duration-150`}
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
        className={`h-16 w-full border-b-[1px] border-gray-500 bg-[var(--surface-container-high)] pl-14 pr-14 text-lg text-[var(--on-background)] outline-none`}
        type="text"
        value={inputValue}
        placeholder={
          photosOrVideos === "Photos"
            ? "Search for photos"
            : "Search for videos"
        }
      />
      <div
        className={`absolute left-0 top-16 w-full bg-[var(--surface-container-high)]`}
      >
        <div className="flex flex-row border-b-[1px] border-gray-500 px-2 py-4 text-xl text-[var(--on-background)]">
          <button
            onClick={() => setPhotosOrVideos("Photos")}
            className={`flex w-1/2 flex-row items-center justify-center gap-2 rounded-l-full border-[1px] border-gray-500 py-1 ${
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
            className={`flex w-1/2 flex-row items-center justify-center gap-2 rounded-r-full border-[1px] border-l-0 border-gray-500 py-1 ${
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
            {history.map((item, index) => {
              return (
                <Link
                  key={index}
                  to={`/media/${photosOrVideos.toLowerCase()}/${item}`}
                >
                  <li
                    onClick={() => {
                      handleHistoryOrder(item);
                      setInputValue(item);
                      setMobSearchBar(false);
                    }}
                    className="flex w-full cursor-pointer flex-row items-center justify-start gap-3 px-2 py-2 text-left hover:bg-[var(--surface-container-highest)]"
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
