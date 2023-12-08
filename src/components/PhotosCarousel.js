import React from "react";
import "../style.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

const PhotosCarousel = () => {
  const { setPageSelected, isMobileView } = useContext(AppContext);

  return (
    <div className="relative flex h-[360px] min-w-full snap-start flex-row items-end overflow-hidden   rounded-2xl bg-[var(--primary-container)] 2xl:h-[580px]">
      <div className="hsl-gradient1 z-[1] flex h-full w-full flex-col items-start justify-center gap-4 pl-8 2xl:pl-12">
        <h2 className="w-[16ch] text-left text-4xl text-[var(--primary)] 2xl:text-7xl">
          High quality stock photos for free!
        </h2>
        {!isMobileView && (
          <p className="text-left text-sm 2xl:text-2xl">
            Explore our exceptional collection of high-quality stock photos.
          </p>
        )}

        <Link to={"/media/photos/curated"}>
          <button
            onClick={() => setPageSelected("Photos")}
            className="w-fit rounded-full bg-[var(--primary)] px-4 py-2 text-[var(--on-primary)] 2xl:px-6 2xl:py-4 2xl:text-3xl"
          >
            Explore now
          </button>
        </Link>
      </div>
      <div className="grid-area-container absolute -bottom-4 -right-4 -top-4 left-[28%]">
        <div className="b1 h-full w-full rounded-br-2xl bg-banner-1 bg-cover bg-center"></div>
        <div className="b2 h-full w-full rounded-b-2xl bg-banner-2 bg-cover bg-center"></div>
        <div className="b3 h-full w-full rounded-bl-2xl bg-banner-3 bg-cover bg-center"></div>
        <div className="b4 h-full w-full rounded-tr-2xl bg-banner-4 bg-cover bg-center"></div>
        <div className="b5 h-full w-full rounded-t-2xl bg-banner-5 bg-cover bg-center"></div>
        <div className="b6 h-full w-full rounded-tl-2xl bg-banner-6 bg-cover bg-center"></div>
      </div>
    </div>
  );
};

export default PhotosCarousel;
