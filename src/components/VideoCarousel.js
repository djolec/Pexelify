import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import "../style.css";
const VideoCarousel = () => {
  const { setPageSelected, isMobileView } = useContext(AppContext);

  return (
    <div className="relative flex h-[360px] min-w-full snap-start flex-row items-end overflow-hidden bg-[var(--secondary-container)] 2xl:h-[580px]">
      <div className="hsl-gradient2 z-[1] flex h-full w-full flex-col items-start justify-center gap-4 pl-8 2xl:pl-12">
        <h2 className="w-[16ch] text-left text-4xl text-[var(--secondary)] 2xl:text-7xl">
          Top rated stock videos for free!
        </h2>
        {!isMobileView && (
          <p className="text-left text-sm text-[var(--secondary)] 2xl:text-2xl">
            Our curated selection videos are sure to inspire and captivate.
          </p>
        )}

        <Link to={"/media/videos/popular"}>
          <button
            onClick={() => setPageSelected("Videos")}
            className="w-fit rounded-full bg-[var(--secondary)] px-4 py-2 text-[var(--on-secondary)] 2xl:px-6 2xl:py-4 2xl:text-3xl"
          >
            Explore now
          </button>
        </Link>
      </div>

      <div className="grid-area-container absolute -bottom-4 -right-4 -top-4 left-[28%]">
        <div className="b1">
          <video
            className="h-full w-full rounded-br-2xl object-cover"
            width="360"
            height="420"
            muted
            autoPlay={true}
            loop={true}
            loading="lazy"
          >
            <source
              src="/assets/videos/video-banner-1.webm"
              type="video/webm"
            />
          </video>
        </div>

        <div className=" b2">
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
              src="/assets/videos/video-banner-2.webm"
              type="video/webm"
            />
          </video>
        </div>

        <div className="b3">
          <video
            className="h-full w-full rounded-bl-2xl object-cover"
            width="480"
            height="360"
            muted
            autoPlay={true}
            loop={true}
            loading="lazy"
          >
            <source
              src="/assets/videos/video-banner-3.webm"
              type="video/webm"
            />
          </video>
        </div>

        <div className="b4">
          <video
            className="h-full w-full rounded-tr-2xl object-cover"
            width="360"
            height="640"
            muted
            autoPlay={true}
            loop={true}
            loading="lazy"
          >
            <source
              src="/assets/videos/video-banner-4.webm"
              type="video/webm"
            />
          </video>
        </div>

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
              src="/assets/videos/video-banner-5.webm"
              type="video/webm"
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
              src="/assets/videos/video-banner-6.webm"
              type="video/webm"
            />
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;
