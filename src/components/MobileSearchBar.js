import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as LeftIcon } from "../svg/arrow-left.svg";
import { ReactComponent as CloseIcon } from "../svg/x.svg";
import { ReactComponent as SearchIcon } from "../svg/search.svg";
import { ReactComponent as PhotoIcon } from "../svg/image-solid.svg";
import { ReactComponent as VideosIcon } from "../svg/video-solid.svg";
import { motion } from "framer-motion";

import SearchBarHistory from "./SearchBarHistory";

const MobileSearchBar = ({ setMobSearchOpen }) => {
  const [inputValue, setInputValue] = useState("");
  const [photosOrVideos, setPhotosOrVideos] = useState("photos");
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("searchHistory")) || [],
  );

  const location = useLocation();
  const navigate = useNavigate();

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
    setMobSearchOpen(false);
    navigate(`/${photosOrVideos}/${inputValue}`);
  };

  const onReset = () => {
    setInputValue("");
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.2 } }}
      onSubmit={onSubmit}
      onReset={onReset}
      className="fixed left-0 top-0 h-screen w-screen bg-[var(--surface-container-high)]"
    >
      <div className="relative flex flex-row px-4 py-4">
        <button
          aria-label="close mobile search bar"
          type="button"
          onClick={() => setMobSearchOpen(false)}
        >
          <LeftIcon className="h-6 w-auto fill-[var(--on-background)]" />
        </button>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          className="h-8 w-full bg-[var(--surface-container-high)] pl-4  pr-16 text-xl text-[var(--on-background)] outline-none 2xl:h-12 2xl:pl-6"
          value={inputValue}
          type="text"
          name="search"
          autoComplete="off"
          placeholder={`Search for ${photosOrVideos}`}
        />

        <div className="absolute right-4 top-0 flex h-full flex-row items-center gap-1 2xl:right-4">
          {inputValue && (
            <button
              type="reset"
              aria-label="reset input"
              className="text-gray-600"
            >
              <CloseIcon className="h-7 w-auto 2xl:h-10" />
            </button>
          )}

          <button type="submit" aria-label="search" disabled={!inputValue}>
            <SearchIcon
              className={`${
                inputValue ? "text-green-600" : "text-gray-600"
              } h-6 w-auto transition-colors duration-150 2xl:h-6 2xl:translate-y-[4px]`}
            />
          </button>
        </div>
      </div>

      <div className="w-full overflow-hidden bg-[var(--surface-container-high)]">
        <div className="flex flex-row border-b-[1px] border-t-[1px] px-2 py-4 text-[var(--on-background)]">
          <button
            aria-label="set search to photos"
            type="button"
            onClick={() => setPhotosOrVideos("photos")}
            className={`flex w-1/2 flex-row items-center justify-center gap-2 rounded-l-full border-[1px] border-gray-500 py-1 ${
              photosOrVideos === "photos"
                ? "bg-[var(--secondary-container)]"
                : ""
            }`}
          >
            <PhotoIcon className="h-8 w-auto fill-[var(--on-background)]" />
            <span className="text-xl">Photos</span>
          </button>
          <button
            aria-label="set search to videos"
            type="button"
            onClick={() => setPhotosOrVideos("videos")}
            className={`flex w-1/2 flex-row items-center justify-center gap-2 rounded-r-full border-[1px] border-l-0 border-gray-500 py-1 ${
              photosOrVideos === "videos"
                ? "bg-[var(--secondary-container)]"
                : ""
            }`}
          >
            <VideosIcon className="h-8 w-auto fill-[var(--on-background)]" />
            <span className="text-xl">Videos</span>
          </button>
        </div>

        {history.length > 0 && (
          <SearchBarHistory
            history={history}
            photosOrVideos={photosOrVideos}
            setInputValue={setInputValue}
            handleHistoryOrder={handleHistoryOrder}
            setSearchBarOpen={setMobSearchOpen}
          />
        )}
      </div>
    </motion.form>
  );
};

export default MobileSearchBar;
