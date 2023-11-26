import React from "react";
import "../style.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

const PhotosCarousel = () => {
  const { setPageSelected, isMobileView } = useContext(AppContext);

  return (
    <div className="snap-start min-w-full h-[360px] flex flex-row items-end bg-[var(--primary-container)]  rounded-2xl overflow-hidden relative">
      <div className="pl-8 hsl-gradient1 h-full w-full flex flex-col justify-center items-start gap-4 z-[1]">
        <h2 className="text-4xl text-[var(--primary)] w-[16ch] text-left">
          High quality stock photos for free!
        </h2>
        {!isMobileView && (
          <p className="text-sm text-left">
            Explore our exceptional collection of high-quality stock photos.
          </p>
        )}

        <Link to={"/media/photos/curated"}>
          <button
            onClick={() => setPageSelected("Photos")}
            className="px-4 py-2 bg-[var(--primary)] text-[var(--on-primary)] rounded-full w-fit"
          >
            Explore Now
          </button>
        </Link>
      </div>
      <div className="absolute -top-4 -bottom-4 -right-4 left-[28%] grid-area-container">
        <div className="w-full h-full b1 bg-banner-1 bg-cover bg-center rounded-br-2xl"></div>
        <div className="w-full h-full b2 bg-banner-2 bg-cover bg-center rounded-b-2xl"></div>
        <div className="w-full h-full b3 bg-banner-3 bg-cover bg-center rounded-bl-2xl"></div>
        <div className="w-full h-full b4 bg-banner-4 bg-cover bg-center rounded-tr-2xl"></div>
        <div className="w-full h-full b5 bg-banner-5 bg-cover bg-center rounded-t-2xl"></div>
        <div className="w-full h-full b6 bg-banner-6 bg-cover bg-center rounded-tl-2xl"></div>
      </div>
    </div>
  );
};

export default PhotosCarousel;
