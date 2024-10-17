import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PhotoIcon from "../../assets/svg/image-solid.svg?react";
import VideosIcon from "../../assets/svg/video-solid.svg?react";
import CloseIcon from "../../assets/svg/x.svg?react";
import SearchIcon from "../../assets/svg/search.svg?react";
import { useSearchParams } from "react-router-dom";
import SearchHistory from "./SearchHistory";
import useClickOutside from "../../hooks/useClickOutside";
import usePhotosOrVideos from "../../hooks/usePhotosOrVideos";
import useHandleHistory from "../history/useHandleHistory";

const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const navigate = useNavigate();
  const searchBarRef = useRef(null);

  const { photosOrVideos, setPhotosOrVideos } = usePhotosOrVideos();
  const handleHistory = useHandleHistory();

  useClickOutside(searchBarRef, setSearchBarOpen);

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchBarOpen(false);
    searchParams.set("query", inputValue);
    setSearchParams(searchParams);
    navigate(`/${photosOrVideos}/search?${searchParams.toString()}`);
    handleHistory(inputValue);
  };

  const onReset = () => {
    setInputValue("");
  };

  return (
    <form
      onSubmit={onSubmit}
      onReset={onReset}
      ref={searchBarRef}
      className="relative mx-auto w-2/4 2xl:text-[26px] hidden sm:block"
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
          <div className="p-2 2xl:p-4 flex flex-row text-[var(--on-background)]">
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

          <SearchHistory
            photosOrVideos={photosOrVideos}
            setInputValue={setInputValue}
            setSearchBarOpen={setSearchBarOpen}
            handleHistory={handleHistory}
          />
        </div>
      )}
    </form>
  );
};

export default SearchBar;
