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
    searchBarOpen,
    setSearchBarOpen,
    searchBarRef,
    pageSelected,
    setPageSelected,
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
    <div
      ref={searchBarRef}
      className={`${
        pageSelected === "Details" ? "md:hidden" : "md:block"
      } relative mx-auto hidden w-2/4 2xl:text-xl`}
    >
      <div className="absolute right-2 top-0 flex h-full flex-row items-center gap-1 2xl:right-4">
        <button
          className={`${inputValue ? "block" : "hidden"} text-gray-600`}
          onClick={() => setInputValue("")}
        >
          <IoCloseOutline className="h-6 w-auto 2xl:h-10" />
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
              } h-4 w-auto translate-y-[2px] transition-colors duration-150 2xl:h-6 2xl:translate-y-[4px]`}
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
        className={`h-8 bg-[var(--surface-container-high)] text-[var(--on-background)] 2xl:h-12 ${
          searchBarOpen
            ? "rounded-t-2xl border-b-[1px] border-gray-500"
            : "rounded-full border-b-0"
        } w-full pl-4 pr-14 outline-none 2xl:pl-6`}
        type="text"
        value={inputValue}
        placeholder={
          photosOrVideos === "Photos"
            ? "Search for photos"
            : "Search for videos"
        }
      />
      <div
        className={`absolute left-0 top-full w-full overflow-hidden rounded-b-2xl bg-[var(--surface-container-high)] ${
          searchBarOpen ? "block" : "hidden"
        }`}
      >
        <div
          className={`px-2 py-2 2xl:px-3 2xl:py-3 ${
            history.length > 0 ? "border-b-[1px] border-gray-500" : null
          }  flex flex-row text-[var(--on-background)]`}
        >
          <button
            onClick={() => setPhotosOrVideos("Photos")}
            className={`flex w-1/2 flex-row items-center justify-center gap-2 rounded-l-full border-[1px] border-gray-500 ${
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
            className={`flex w-1/2 flex-row items-center justify-center gap-2 rounded-r-full border-[1px] border-l-0 border-gray-500 ${
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
                      setSearchBarOpen(false);
                    }}
                    className="flex w-full cursor-pointer flex-row items-center justify-start gap-3 px-2 py-2 text-left hover:bg-[var(--surface-container-highest)]"
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
