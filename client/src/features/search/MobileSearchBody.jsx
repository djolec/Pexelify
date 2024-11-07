import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import usePhotosOrVideos from "../../hooks/usePhotosOrVideos";
import useHandleHistory from "../history/useHandleHistory";
import SearchIcon from "../../assets/svg/search.svg?react";
import LeftIcon from "../../assets/svg/arrow-left.svg?react";
import CloseIcon from "../../assets/svg/x.svg?react";
import PhotoIcon from "../../assets/svg/image-solid.svg?react";
import VideosIcon from "../../assets/svg/video-solid.svg?react";
import SearchHistory from "./SearchHistory";

const MobileSearchBody = ({ setMobSearchOpen }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");
  const { photosOrVideos, setPhotosOrVideos } = usePhotosOrVideos();
  const handleHistory = useHandleHistory();
  const navigate = useNavigate();

  const itemsVars = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.2,
        delay: 0.5,
      },
    },
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setMobSearchOpen(false);
    searchParams.set("query", inputValue);
    setSearchParams(searchParams);
    navigate(`/${photosOrVideos}/search?${searchParams.toString()}`);
    handleHistory(inputValue);
  };

  const onReset = () => {
    setInputValue("");
  };

  return (
    <motion.form
      initial={{ scaleY: 0 }}
      animate={{
        scaleY: 1,
        transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
      }}
      onSubmit={onSubmit}
      onReset={onReset}
      className="fixed left-0 top-0 h-screen w-screen origin-top bg-[var(--surface-container-high)] sm:hidden"
    >
      <motion.div
        variants={itemsVars}
        initial="initial"
        animate="animate"
        className="relative flex flex-row px-4 py-6"
      >
        <button
          aria-label="close mobile search bar"
          type="button"
          onClick={() => setMobSearchOpen(false)}
        >
          <LeftIcon className="h-6 w-auto fill-[var(--on-background)]" />
        </button>

        <input
          onChange={(e) => setInputValue(e.target.value)}
          className="h-8 w-full bg-[var(--surface-container-high)] pl-4 pr-16 text-xl text-[var(--on-background)] outline-none 2xl:h-12 2xl:pl-6"
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
      </motion.div>

      <motion.div
        variants={itemsVars}
        initial="initial"
        animate="animate"
        className="w-full overflow-hidden bg-[var(--surface-container-high)]"
      >
        <div className="flex flex-row border-b-[1px] border-t-[1px] border-gray-500 px-2 py-4 text-[var(--on-background)]">
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

        <SearchHistory
          photosOrVideos={photosOrVideos}
          setInputValue={setInputValue}
          setSearchBarOpen={setMobSearchOpen}
          handleHistory={handleHistory}
        />
      </motion.div>
    </motion.form>
  );
};

export default MobileSearchBody;
