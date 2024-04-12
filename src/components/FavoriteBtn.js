import React from "react";
import { useContext } from "react";
import { ReactComponent as FavIcon } from "../svg/heart-straight-bold.svg";
import { ReactComponent as SavedIcon } from "../svg/heart-straight-fill.svg";
import { AppContext } from "../App";

const FavoriteBtn = ({ mediaObj }) => {
  const { savedMedia, setSavedMedia } = useContext(AppContext);

  const updateMedia = (newMedia) => {
    setSavedMedia(newMedia);
    localStorage.setItem("savedMedia", JSON.stringify(newMedia));
  };

  const saveMedia = () => {
    const newMedia = [...savedMedia, mediaObj];
    updateMedia(newMedia);
  };

  const deleteMedia = () => {
    const newMedia = savedMedia.filter((obj) => obj.id !== mediaObj.id);
    updateMedia(newMedia);
  };

  return (
    <>
      {savedMedia.some((obj) => obj.id === mediaObj.id) ? (
        <button
          onClick={deleteMedia}
          aria-label="save to favorites"
          className="rounded-full bg-[var(--surface)] text-[var(--on-background)] transition-colors duration-100 hover:bg-[var(--surface-variant)]"
        >
          <SavedIcon className="h-10 w-auto p-2 2xl:h-12" />
        </button>
      ) : (
        <button
          onClick={saveMedia}
          aria-label="save to favorites"
          className="rounded-full bg-[var(--surface)] text-[var(--on-background)] transition-colors duration-100 hover:bg-[var(--surface-variant)]"
        >
          <FavIcon className="h-10 w-auto p-2 2xl:h-12" />
        </button>
      )}
    </>
  );
};

export default FavoriteBtn;
