import React from "react";
import { useFetchAllPopular } from "../hooks/useFetchData";
import { handleScroll } from "../utils/handleScroll";
import { distributeMedia } from "../utils/columnUtils";
import { useNumberOfColumns } from "../hooks/useNumberOfColumns";
import { useEffect } from "react";
import VideoCard from "./VideoCard";
import Loader from "./Loader";

const PopularVideos = () => {
  const { data, error, isError, fetchNextPage, isFetching } =
    useFetchAllPopular();

  const { numberOfColumns } = useNumberOfColumns();

  useEffect(() => {
    window.scrollTo(0, 0);

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
        <div key={index} className="flex flex-col pb-10">
          {column.map((card) => {
            const { id, video_files, video_pictures } = card;
            const sortedVideos = video_files.sort((a, b) => a.width - b.width);
            const image = video_pictures[0].picture;
            const { width, height, link } = sortedVideos[0];
            return (
              <VideoCard
                key={id}
                numberOfColumns={numberOfColumns}
                source={link}
                cardWidth={width}
                cardHeight={height}
                videoID={id}
                videoImg={image}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <section className="w-full flex-grow md:w-[70%]">
      <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:text-5xl">
        Popular videos
      </h1>
      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3`}>
        {renderMedia()}
      </div>
      {isFetching && <Loader />}
      {isError && (
        <h1 className="mt-20 w-full whitespace-nowrap text-center text-2xl text-[var(--on-background)]">
          {error.message}
        </h1>
      )}
    </section>
  );
};

export default PopularVideos;
