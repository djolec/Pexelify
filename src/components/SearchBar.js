import React from "react";
import { useState, useRef, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { ReactComponent as PhotoIcon } from "../svg/image-solid.svg";
import { ReactComponent as VideosIcon } from "../svg/video-solid.svg";
import { ReactComponent as CloseIcon } from "../svg/x.svg";
import { ReactComponent as SearchIcon } from "../svg/search.svg";

import SearchBarHistory from "./SearchBarHistory";

const SearchBar = () => {
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [photosOrVideos, setPhotosOrVideos] = useState("photos");
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || [],
  );

  const searchBarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const closeSearchBar = (e) => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target)) {
        setSearchBarOpen(false);
      }
    };

    document.addEventListener("mousedown", closeSearchBar);

    return () => document.removeEventListener("mousedown", closeSearchBar);
  }, []);

  useEffect(() => {
    if (location.pathname.includes("photos")) {
      setPhotosOrVideos("photos");
    } else if (location.pathname.includes("videos")) {
      setPhotosOrVideos("videos");
    }
  }, [location]);

  const updateHistory = (newHistory) => {
    setHistory(newHistory);
    localStorage.setItem("searchHistory", JSON.stringify(newHistory));
  };

  const handleHistoryOrder = (clickedItem) => {
    const newHistory = [
      clickedItem,
      ...history.filter((item) => item !== clickedItem),
    ];
    updateHistory(newHistory);
  };

  const handleSearchHistory = () => {
    if (inputValue) {
      const newHistory = [
        inputValue,
        ...history.filter((item) => item !== inputValue),
      ];
      const truncatedHistory = newHistory.slice(0, 5);
      updateHistory(truncatedHistory);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearchHistory();
    setSearchBarOpen(false);
    navigate(`${photosOrVideos}/${inputValue}`);
  };

  const onReset = () => {
    setInputValue("");
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={onReset}
      ref={searchBarRef}
      className="relative mx-auto hidden w-2/4 md:block 2xl:text-[26px]"
    >
      <input
        onFocus={() => setSearchBarOpen(true)}
        onChange={(e) => setInputValue(e.target.value)}
        className={`h-8 bg-[var(--surface-container-high)] text-[var(--on-background)] 2xl:h-16 ${
          searchBarOpen
            ? "rounded-t-2xl border-b-[1px] border-gray-500 2xl:rounded-t-[30px]"
            : "rounded-full border-b-0"
        } w-full pl-4 pr-14 outline-none 2xl:pl-6 2xl:pr-28`}
        value={inputValue}
        type="text"
        name="search"
        autoComplete="off"
        placeholder={`Search for ${photosOrVideos}`}
      />

      <div className="absolute right-2 top-0 flex h-full flex-row items-center gap-1 2xl:right-4 2xl:gap-2">
        {inputValue && (
          <button
            type="reset"
            aria-label="reset input"
            className="text-gray-600"
          >
            <CloseIcon className="h-6 w-auto 2xl:h-10" />
          </button>
        )}

        <button type="submit" aria-label="search" disabled={!inputValue}>
          <SearchIcon
            className={`${
              inputValue ? "text-green-600" : "text-gray-600"
            } h-5 w-auto transition-colors duration-150 2xl:h-8 2xl:translate-y-[1px]`}
          />
        </button>
      </div>

      {searchBarOpen && (
        <div className="absolute left-0 top-full w-full overflow-hidden rounded-b-2xl bg-[var(--surface-container-high)]">
          <div
            className={`p-2 2xl:p-4 ${
              history.length > 0 ? "border-b-[1px] border-gray-500" : ""
            }  flex flex-row text-[var(--on-background)]`}
          >
            <button
              aria-label="set search to photos"
              type="button"
              onClick={() => setPhotosOrVideos("photos")}
              className={`flex w-1/2 flex-row items-center justify-center gap-2 rounded-l-full border-[1px] border-gray-500 ${
                photosOrVideos === "photos"
                  ? "bg-[var(--secondary-container)]"
                  : ""
              }`}
            >
              <PhotoIcon className="h-5 w-auto fill-[var(--on-background)] 2xl:h-8" />
              <span>Photos</span>
            </button>
            <button
              aria-label="set search to videos"
              type="button"
              onClick={() => setPhotosOrVideos("videos")}
              className={`flex w-1/2 flex-row items-center justify-center gap-2 rounded-r-full border-[1px] border-l-0 border-gray-500 ${
                photosOrVideos === "videos"
                  ? "bg-[var(--secondary-container)]"
                  : ""
              }`}
            >
              <VideosIcon className="h-5 w-auto fill-[var(--on-background)] 2xl:h-8" />
              <span>Videos</span>
            </button>
          </div>

          {history.length > 0 && (
            <SearchBarHistory
              history={history}
              photosOrVideos={photosOrVideos}
              setInputValue={setInputValue}
              handleHistoryOrder={handleHistoryOrder}
              setSearchBarOpen={setSearchBarOpen}
            />
          )}
        </div>
      )}
    </form>
  );
};

export default SearchBar;
