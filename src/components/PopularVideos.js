import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import { useFetchHomepageVideos } from "../Hooks/useFetchData";
import VideoCard from "./VideoCard";
import { PulseLoader } from "react-spinners";
import "../style.css";

const PopularVideos = () => {
  const fetchParam = "page=1&per_page=40";
  const { data, isLoading, isFetching, isError, error } =
    useFetchHomepageVideos(fetchParam);

  const { setPageSelected } = useContext(AppContext);

  return (
    <section
      className={`w-full flex flex-row justify-center items-start ${
        isFetching || isError ? "h-[600px]" : "md:h-[140vw] h-[450vw]"
      } relative overflow-hidden`}
    >
      {data?.data && (
        <div className="md:w-[70%] w-full h-36 absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none hsl-basic z-[30]">
          <Link to={"/media/videos/popular"}>
            <button
              onClick={() => setPageSelected("Videos")}
              className="px-4 py-2 2xl:py-3 2xl:text-3xl pointer-events-auto rounded-full bg-[var(--secondary)] text-[var(--on-secondary)] w-fit absolute bottom-12 2xl:bottom-14 left-1/2 -translate-x-1/2"
            >
              Explore more
            </button>
          </Link>
        </div>
      )}

      <div className="w-full md:w-[70%] py-8 flex flex-col custom-div gap-2 justify-start relative">
        <h1 className="text-left text-2xl 2xl:text-5xl mb-4 text-[var(--on-background)]">
          Popular videos
        </h1>
        <div className="md:columns-3 columns-2 flex-grow relative">
          {data?.data && !isLoading
            ? data.data.videos.map((card) => {
                const sortedVideos = card.video_files.sort(
                  (a, b) => a.width - b.width
                );
                return (
                  <div key={card.id} className="mb-4">
                    <VideoCard
                      bgImage={card.image}
                      source={sortedVideos[0].link}
                      cardWidth={
                        card.video_files[card.video_files.length - 1].width
                      }
                      cardHeight={
                        card.video_files[card.video_files.length - 1].height
                      }
                      videoID={card.id}
                      videoImg={card.image}
                    />
                  </div>
                );
              })
            : null}
          {isFetching && (
            <PulseLoader
              className="pb-20 absolute top-20 left-1/2 -translate-x-1/2"
              size={25}
              color="var(--on-background)"
            />
          )}
          {isError && (
            <h1 className="w-full text-2xl text-left text-[var(--on-background)] whitespace-nowrap">
              {error.message}
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default PopularVideos;
