import React from "react";
import { useEffect, useContext, useLayoutEffect } from "react";
import { AppContext } from "../App";
import VideoCard from "./VideoCard";
import { PulseLoader } from "react-spinners";
import { useFetchAllPopular } from "../Hooks/useFetchData";
import { distributeMedia } from "../helper/columnUtils";
import { handleScroll } from "../helper/handleScroll";

const AllPopular = () => {
  const { setPageSelected, setPhotosOrVideos, numberOfColumns, bigScreen } =
    useContext(AppContext);

  const { data, error, isError, fetchNextPage, refetch, isFetching } =
    useFetchAllPopular();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    setPageSelected("Videos");
    setPhotosOrVideos("Videos");
    refetch();
  }, []);

  useEffect(() => {
    const scrollHandle = () => handleScroll(fetchNextPage);
    window.addEventListener("scroll", scrollHandle, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", scrollHandle);
    };
  }, []);

  const finalColumns = Array.from({ length: numberOfColumns }, () => []);
  let finalColumnHeights = Array(numberOfColumns).fill(0);

  const renderMedia = () => {
    return distributeMedia(
      data,
      finalColumns,
      finalColumnHeights,
      "videos",
      numberOfColumns,
    ).map((column, index) => {
      return (
        <div key={index} className="flex flex-col gap-4 pb-10">
          {column.map((card) => {
            const { id, image, video_files } = card;
            const sortedVideos = video_files.sort((a, b) => a.width - b.width);
            return (
              <div key={id}>
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
      );
    });
  };

  return (
    <section
      className="flex w-full flex-grow flex-row
       items-start justify-center"
    >
      <div className="w-full md:w-[70%]">
        <h1 className="mx-auto mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:text-5xl">
          Popular videos
        </h1>
        <div
          className={`grid ${
            numberOfColumns === 2 ? "grid-cols-2" : "grid-cols-3"
          } gap-4`}
        >
          {renderMedia()}
        </div>
        {isFetching && (
          <PulseLoader
            className="pb-20"
            size={`${bigScreen ? "45px" : "25px"}`}
            color="var(--on-background)"
          />
        )}
        {isError && (
          <h1 className="w-full text-left text-2xl text-[var(--on-background)]">
            {error.message}
          </h1>
        )}
      </div>
    </section>
  );
};

export default AllPopular;
