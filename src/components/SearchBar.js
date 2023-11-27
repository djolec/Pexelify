import React, { useLayoutEffect } from "react";
import { useState, useEffect } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LiaVideoSolid } from "react-icons/lia";
import { MdInsertPhoto } from "react-icons/md";
import { PiClockCounterClockwise } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import { useContext, useRef } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

const SearchBar = () => {
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
    searchBarOpen,
    setSearchBarOpen,
    searchBarRef,
    pageSelected,
    setPageSelected,
    mobSearchBar,
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
    <div
      ref={searchBarRef}
      className={`${
        pageSelected === "Details" ? "md:hidden" : "md:block"
      } w-2/4 mx-auto relative hidden`}
    >
      <div className="absolute top-0 right-2 h-full flex flex-row items-center gap-1">
        <button
          className={`${inputValue ? "block" : "hidden"} text-gray-600`}
          onClick={() => setInputValue("")}
        >
          <IoCloseOutline className="h-6 w-auto" />
        </button>
        <Link to={`/media/${photosOrVideos.toLowerCase()}/${inputValue}`}>
          <button
            ref={searchRef}
            onClick={() => {
              handleSearchHistory();
              setPageSelected(photosOrVideos);
              setSearchBarOpen(false);
            }}
            disabled={!inputValue}
          >
            <FaMagnifyingGlass
              className={`${
                inputValue ? "text-green-600" : "text-gray-600"
              } h-4 w-auto transition-colors duration-150 translate-y-[2px]`}
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
        className={`bg-[var(--surface-container-high)] text-[var(--on-background)] h-8 ${
          searchBarOpen
            ? "rounded-t-2xl border-b-[1px] border-gray-500"
            : "rounded-full border-b-0"
        } w-full outline-none pr-14 pl-4`}
        type="text"
        value={inputValue}
        placeholder={
          photosOrVideos === "Photos"
            ? "Search for photos"
            : "Search for videos"
        }
      />
      <div
        className={`bg-[var(--surface-container-high)] top-full left-0 absolute w-full rounded-b-2xl overflow-hidden ${
          searchBarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className={`py-2 px-2 ${
            history.length > 0 ? "border-b-[1px] border-gray-500" : null
          }  flex flex-row text-[var(--on-background)]`}
        >
          <button
            onClick={() => setPhotosOrVideos("Photos")}
            className={`w-1/2 rounded-l-full border-[1px] border-gray-500 flex flex-row items-center justify-center gap-2 ${
              photosOrVideos === "Photos"
                ? "bg-[var(--secondary-container)]"
                : null
            }`}
          >
            <MdInsertPhoto className="h-5 w-auto" />
            <span>Photos</span>
          </button>
          <button
            onClick={() => setPhotosOrVideos("Videos")}
            className={`w-1/2 rounded-r-full border-[1px] border-gray-500 border-l-0 flex flex-row items-center justify-center gap-2 ${
              photosOrVideos === "Videos"
                ? "bg-[var(--secondary-container)]"
                : null
            }`}
          >
            <LiaVideoSolid className="h-5 w-auto" />
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
                        setSearchBarOpen(false);
                      }}
                      className="w-full text-left cursor-pointer px-2 py-2 flex flex-row items-center justify-start gap-3 hover:bg-[var(--surface-container-highest)]"
                    >
                      <PiClockCounterClockwise />
                      <span>{item}</span>
                    </li>
                  </Link>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
