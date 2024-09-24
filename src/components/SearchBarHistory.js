import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HistoryIcon } from "../svg/history.svg";

const SearchBarHistory = ({
  history,
  photosOrVideos,
  setInputValue,
  handleHistoryOrder,
  setSearchBarOpen,
}) => {
  return (
    <ul className="w-full text-[var(--on-background)]">
      {history.map((item, index) => {
        return (
          <li
            key={index}
            onClick={() => {
              setInputValue(item);
              handleHistoryOrder(item);
              setSearchBarOpen(false);
            }}
            className="w-full cursor-pointer py-1 hover:bg-[var(--surface-container-highest)] sm:py-0"
          >
            <Link
              className="flex flex-row items-center justify-start gap-3  p-2 text-left 2xl:p-4"
              to={`${photosOrVideos}/${item}`}
            >
              <HistoryIcon className="h-7 w-auto sm:h-5 2xl:h-9" />
              <span className="text-xl sm:text-base 2xl:text-2xl">{item}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchBarHistory;
