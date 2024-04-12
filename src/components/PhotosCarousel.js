import React from "react";
import "../style.css";
import { useNavigate } from "react-router-dom";

const PhotosCarousel = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-[360px] min-w-full snap-start flex-row items-end overflow-hidden bg-[var(--primary-container)] 2xl:h-[580px]">
      <div className="hsl-gradient1 z-[1] flex h-full w-full flex-col items-start justify-center gap-4 pl-8 2xl:pl-12">
        <h2 className="w-[16ch] text-left text-4xl text-[var(--primary)] 2xl:text-7xl">
          High quality stock photos for free!
        </h2>

        <p className="hidden text-left text-sm text-[var(--primary)] md:block 2xl:text-2xl">
          Explore our exceptional collection of high-quality stock photos.
        </p>

        <button
          aria-label="curated photos"
          onClick={() => navigate("/photos/curated")}
          className="w-fit rounded-full bg-[var(--primary)] px-4 py-2 text-[var(--on-primary)] 2xl:px-6 2xl:py-4 2xl:text-3xl"
        >
          Explore now
        </button>
      </div>
      <div className="grid-area-container absolute inset-0 left-[28%]">
        <div className="b1 rounded-br-2xl bg-[url('/public/assets/images/photo-banner-1.webp')] bg-cover bg-center" />
        <div className="b2 rounded-b-2xl bg-[url('/public/assets/images/photo-banner-2.webp')] bg-cover bg-center" />
        <div className="b3 rounded-bl-2xl bg-[url('/public/assets/images/photo-banner-3.webp')] bg-cover bg-center" />
        <div className="b4 rounded-tr-2xl bg-[url('/public/assets/images/photo-banner-4.webp')] bg-cover bg-center" />
        <div className="b5 rounded-t-2xl bg-[url('/public/assets/images/photo-banner-5.webp')] bg-cover bg-center" />
        <div className="b6 rounded-tl-2xl bg-[url('/public/assets/images/photo-banner-6.webp')] bg-cover bg-center" />
      </div>
    </div>
  );
};

export default PhotosCarousel;
