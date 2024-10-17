import HistoryIcon from "../../assets/svg/history.svg?react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SearchHistory = ({
  setInputValue,
  photosOrVideos,
  handleHistory,
  setSearchBarOpen,
}) => {
  const { auth } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleClick = (item) => {
    setInputValue(item);
    searchParams.set("query", item);
    setSearchParams(searchParams);
    setSearchBarOpen(false);
    navigate(`/${photosOrVideos}/search?${searchParams.toString()}`);
    handleHistory(item);
  };

  return (
    <ul
      className={`w-full text-[var(--on-background)] border-t-[1px] border-gray-500 ${
        auth.history.length === 0 ? "hidden" : ""
      }`}
    >
      {auth.history.map((item, index) => (
        <li
          key={index}
          onClick={() => handleClick(item)}
          className="w-full cursor-pointer py-1 hover:bg-[var(--surface-container-highest)] sm:py-0"
        >
          <div className="flex flex-row items-center justify-start gap-3 p-2 text-left 2xl:p-4">
            <HistoryIcon className="h-7 w-auto sm:h-5 2xl:h-9" />
            <span className="text-xl sm:text-base 2xl:text-2xl">{item}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default SearchHistory;
