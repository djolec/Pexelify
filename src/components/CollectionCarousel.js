import React from "react";
import "../style.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import collvideo2 from "../assets/videos/collection-banner-2.mp4";
import collvideo5 from "../assets/videos/collection-banner-5.mp4";
import collvideo6 from "../assets/videos/collection-banner-6.mp4";

const CollectionCarousel = () => {
  const { setPageSelected, isMobileView } = useContext(AppContext);

  return (
    <div className="snap-start min-w-full h-[360px] flex flex-row items-end bg-[var(--tertiary-container)]  rounded-2xl relative overflow-hidden">
      <div className="pl-8 hsl-gradient3 h-full w-full flex flex-col justify-center items-start gap-4 z-[1]">
        <h2 className="text-4xl text-[var(--tertiary)] w-[16ch] text-left">
          Best collections with best media!
        </h2>
        {!isMobileView && (
          <p className="text-sm text-left">
            Discover a treasure trove of stunning images and captivating videos.
          </p>
        )}

        <Link to={"/media/collections/featured"}>
          <button
            onClick={() => setPageSelected("Collections")}
            className="px-4 py-2 bg-[var(--tertiary)] text-[var(--on-secondary)] rounded-full w-fit"
          >
            Explore Now
          </button>
        </Link>
      </div>
      <div className="absolute -top-4 -bottom-4 -right-4 left-[28%] grid-area-container">
        <div className="w-full h-full b1 bg-coll-banner1 bg-cover bg-center rounded-br-2xl"></div>

        <div className="b2">
          <video
            className="w-full h-full object-cover rounded-b-2xl"
            width="360"
            height="640"
            muted
            autoPlay={true}
            loop={true}
            loading="lazy"
          >
            <source src={collvideo2} type="video/mp4" />
          </video>
        </div>

        <div className="w-full h-full b3 bg-coll-banner3 bg-cover bg-center rounded-bl-2xl"></div>

        <div className="w-full h-full b4 bg-coll-banner4 bg-cover bg-center rounded-tr-2xl"></div>

        <div className="b5">
          <video
            className="w-full h-full object-cover rounded-t-2xl"
            width="640"
            height="360"
            muted
            autoPlay={true}
            loop={true}
            loading="lazy"
          >
            <source src={collvideo5} type="video/mp4" />
          </video>
        </div>

        <div className="b6">
          <video
            className="w-full h-full object-cover rounded-tl-2xl"
            width="480"
            height="360"
            muted
            autoPlay={true}
            loop={true}
            loading="lazy"
          >
            <source src={collvideo6} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default CollectionCarousel;
