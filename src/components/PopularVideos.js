import React from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useLayoutEffect } from "react";
import { AppContext } from "../App";
import { useFetchHomepageVideos } from "../Hooks/useFetchData";
import VideoCard from "./VideoCard";
import { PulseLoader } from "react-spinners";
import "../style.css";
import { motion } from "framer-motion";

const PopularVideos = () => {
  const fetchParam = "page=1&per_page=40";
  const { data, isLoading, isFetching, isError, error, refetch } =
    useFetchHomepageVideos(fetchParam);

  const { setPageSelected, bigScreen } = useContext(AppContext);

  useLayoutEffect(() => {
    refetch();
  }, []);

  return (
    <section className="relative h-[200vh] w-full flex-grow overflow-hidden">
      {data?.data && (
        <div className="hsl-basic 2 pointer-events-none absolute bottom-0 left-1/2 z-[30] h-36 w-full -translate-x-1/2 md:w-[70%]">
          <Link to={"/media/videos/popular"}>
            <button
              onClick={() => setPageSelected("Videos")}
              className="pointer-events-auto absolute bottom-12 left-1/2 w-fit -translate-x-1/2 rounded-full bg-[var(--secondary)] px-4 py-2 text-[var(--on-secondary)] 2xl:bottom-14 2xl:px-6 2xl:py-4 2xl:text-3xl"
            >
              Explore more
            </button>
          </Link>
        </div>
      )}

      <div className="relative mx-auto h-[200vh] w-full pt-8 md:w-[70%]">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: 0.3, delay: 0.1 }}
          className="mb-4 text-left text-2xl text-[var(--on-background)] 2xl:text-5xl"
        >
          Popular videos
        </motion.h1>
        <div className="relative flex-grow columns-2 md:columns-3">
          {data?.data.videos.map((card) => {
            const { id, image, video_files } = card;
            const sortedVideos = video_files.sort((a, b) => a.width - b.width);
            return (
              <div key={id} className="mb-4">
                <VideoCard
                  bgImage={image}
                  source={sortedVideos[0].link}
                  cardWidth={video_files[video_files.length - 1].width}
                  cardHeight={video_files[video_files.length - 1].height}
                  videoID={id}
                  videoImg={image}
                />
              </div>
            );
          })}
        </div>
        {isLoading && (
          <PulseLoader
            className="absolute left-1/2 top-20 -translate-x-1/2 pb-20"
            size={`${bigScreen ? "45px" : "25px"}`}
            color="var(--on-background)"
          />
        )}
        {isError && (
          <h1 className="w-full whitespace-nowrap text-left text-2xl text-[var(--on-background)]">
            {error.message}
          </h1>
        )}
      </div>
    </section>
  );
};

export default PopularVideos;
