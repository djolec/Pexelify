import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import "../style.css";
import video1 from "../assets/videos/video-banner-1.mp4";
import video2 from "../assets/videos/video-banner-2.mp4";
import video3 from "../assets/videos/video-banner-3.mp4";
import video4 from "../assets/videos/video-banner-4.mp4";
import video5 from "../assets/videos/video-banner-5.mp4";
import video6 from "../assets/videos/video-banner-6.mp4";
const VideoCarousel = () => {
  const { setPageSelected, isMobileView } = useContext(AppContext);

  return (
    <div className="snap-start min-w-full h-[360px] flex flex-row items-end bg-[var(--secondary-container)]  rounded-2xl relative overflow-hidden">
      <div className="pl-8 hsl-gradient2 h-full w-full flex flex-col justify-center items-start gap-4 z-[1]">
        <h2 className="text-4xl text-[var(--secondary)] w-[16ch] text-left">
          Top rated stock Videos for free!
        </h2>
        {!isMobileView && (
          <p className="text-sm text-left">
            Our curated selection videos are sure to inspire and captivate.
          </p>
        )}

        <Link to={"/media/videos/popular"}>
          <button
            onClick={() => setPageSelected("Videos")}
            className="px-4 py-2 bg-[var(--secondary)] text-[var(--on-secondary)] rounded-full w-fit"
          >
            Explore Now
          </button>
        </Link>
      </div>

      <div className="absolute -top-4 -bottom-4 -right-4 left-[28%] grid-area-container">
        <div className="b1">
          <video
            className="w-full h-full object-cover rounded-br-2xl"
            width="360"
            height="420"
            muted
            autoPlay={true}
            loop={true}
            loading="lazy"
          >
            <source src={video1} type="video/mp4" />
          </video>
        </div>

        <div className=" b2">
          <video
            className="w-full h-full object-cover rounded-b-2xl"
            width="360"
            height="640"
            muted
            autoPlay={true}
            loop={true}
            loading="lazy"
          >
            <source src={video2} type="video/mp4" />
          </video>
        </div>

        <div className="b3">
          <video
            className="w-full h-full object-cover rounded-bl-2xl"
            width="480"
            height="360"
            muted
            autoPlay={true}
            loop={true}
            loading="lazy"
          >
            <source src={video3} type="video/mp4" />
          </video>
        </div>

        <div className="b4">
          <video
            className="w-full h-full object-cover rounded-tr-2xl"
            width="360"
            height="640"
            muted
            autoPlay={true}
            loop={true}
            loading="lazy"
          >
            <source src={video4} type="video/mp4" />
          </video>
        </div>

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
            <source src={video5} type="video/mp4" />
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
            <source src={video6} type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;
