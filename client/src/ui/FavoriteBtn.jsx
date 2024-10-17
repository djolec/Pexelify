import FavIcon from "../assets/svg/heart-straight-bold.svg?react";
import SavedIcon from "../assets/svg/heart-straight-fill.svg?react";

const FavoriteBtn = ({ add, remove, isSaved, fill = "fill-white" }) => {
  return (
    <button
      onClick={isSaved ? remove : add}
      aria-label={isSaved ? "remove from favorites" : "add to favorites"}
      className=" grid h-10 w-10 place-content-center text-white "
    >
      {isSaved ? (
        <SavedIcon className={`h-6 w-auto 2xl:h-10 ${fill}`} />
      ) : (
        <FavIcon className={`h-6 w-auto 2xl:h-10 ${fill}`} />
      )}
    </button>
  );
};

export default FavoriteBtn;
