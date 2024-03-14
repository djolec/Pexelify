import React from "react";
import "../style.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";

const CollectionCarousel = () => {
  const { setPageSelected, isMobileView } = useContext(AppContext);

  return (
    <div className="relative flex h-[360px] min-w-full snap-start flex-row items-end overflow-hidden  rounded-2xl bg-[var(--tertiary-container)] 2xl:h-[580px]">
      <div className="hsl-gradient3 z-[1] flex h-full w-full flex-col items-start justify-center gap-4 pl-8 2xl:pl-12">
        <h2 className="w-[16ch] text-left text-4xl text-[var(--tertiary)] 2xl:text-7xl">
          Best collections with best media!
        </h2>
        {!isMobileView && (
          <p className="text-left text-sm text-[var(--tertiary)] 2xl:text-2xl">
            Discover a treasure trove of stunning images and captivating videos.
          </p>
        )}

        <Link to={"/media/collections/featured"}>
          <button
            onClick={() => setPageSelected("Collections")}
            className="w-fit rounded-full bg-[var(--tertiary)] px-4 py-2 text-[var(--on-secondary)] 2xl:px-6 2xl:py-4 2xl:text-3xl"
          >
            Explore now
          </button>
        </Link>
      </div>
      <div className="grid-area-container absolute -bottom-4 -right-4 -top-4 left-[28%]">
        <div className="b1 h-full w-full rounded-br-2xl bg-[url('/public/assets/images/collection-banner-1.jpg')] bg-cover bg-center"></div>

        <div className="b2">
          <video
            className="h-full w-full rounded-b-2xl object-cover"
            width="360"
            height="640"
            muted
            autoPlay={true}
            loop={true}
            loading="lazy"
          >
            <source
              src="/assets/videos/collection-banner-2.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="b3 h-full w-full rounded-bl-2xl bg-[url('/public/assets/images/collection-banner-3.jpg')] bg-cover bg-center"></div>

        <div className="b4 h-full w-full rounded-tr-2xl bg-[url('/public/assets/images/collection-banner-4.jpg')] bg-cover bg-center"></div>

        <div className="b5">
          <video
            className="h-full w-full rounded-t-2xl object-cover"
            width="640"
            height="360"
            muted
            autoPlay={true}
            loop={true}
            loading="lazy"
          >
            <source
              src="/assets/videos/collection-banner-5.mp4"
              type="video/mp4"
            />
          </video>
        </div>

        <div className="b6">
          <video
            className="h-full w-full rounded-tl-2xl object-cover"
            width="480"
            height="360"
            muted
            autoPlay={true}
            loop={true}
            loading="lazy"
          >
            <source
              src="/assets/videos/collection-banner-6.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </div>
  );
};

export default CollectionCarousel;
