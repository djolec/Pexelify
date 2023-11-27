import React from "react";
import { useEffect, useContext, useLayoutEffect } from "react";
import { AppContext } from "../App";
import VideoCard from "./VideoCard";
import { PulseLoader } from "react-spinners";
import { useFetchAllPopular } from "../Hooks/useFetchData";
import { distributeMedia } from "../helper/columnUtils";
import { handleScroll } from "../helper/handleScroll";

const AllPopular = () => {
  const { setPageSelected, setPhotosOrVideos, numberOfColumns } =
    useContext(AppContext);

  const { data, error, isError, fetchNextPage, refetch, isFetching } =
    useFetchAllPopular();
  console.log(data);

  useLayoutEffect(() => {
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
      numberOfColumns
    ).map((column, index) => {
      return (
        <div key={index} className="flex flex-col gap-4 pb-10">
          {column.map((card) => {
            const sortedVideos = card.video_files.sort(
              (a, b) => a.width - b.width
            );
            return (
              <div key={card.id}>
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
          })}
        </div>
      );
    });
  };

  return (
    <section
      className="flex-grow w-full flex flex-row
       justify-center items-start"
    >
      <div className="md:w-[70%] w-full">
        <h1 className="mx-auto w-full text-left text-2xl mb-4 text-[var(--on-background)]">
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
            size={25}
            color="var(--on-background)"
          />
        )}
        {isError && (
          <h1 className="w-full text-2xl text-left text-[var(--on-background)]">
            {error.message}
          </h1>
        )}
      </div>
    </section>
  );
};

export default AllPopular;
