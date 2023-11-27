import React from "react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchVideos } from "../Hooks/useFetchData";
import { PulseLoader } from "react-spinners";
import VideoCard from "./VideoCard";
import Filter from "./Filter";
import { AppContext } from "../App";
import { distributeMedia } from "../helper/columnUtils";

const SearchVideos = () => {
  const { searchObj, setPageSelected, handleScroll, numberOfColumns } =
    useContext(AppContext);
  const { id } = useParams();

  const {
    data,
    error,
    isError,
    fetchNextPage,
    isFetching,
    isLoading,
    refetch,
  } = useSearchVideos(id, searchObj);

  useEffect(() => {
    setPageSelected("Videos");
  }, []);

  useEffect(
    () => {
      refetch();
      if (!isLoading) {
        console.log(data);
      }
    },
    [searchObj],
    [id]
  );

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
      <div className="md:w-[70%] w-full flex flex-col gap-8">
        <div>
          <h1 className="mx-auto w-full mb-2 text-left text-2xl text-[var(--on-background)]">
            {id} videos
          </h1>
          <Filter />
        </div>
        <div
          className={`grid ${
            numberOfColumns === 2 ? "grid-cols-2" : "grid-cols-3"
          } gap-4`}
        >
          {renderMedia()}
        </div>
        {isFetching && (
          <PulseLoader
            className="pb-20 self-center"
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

export default SearchVideos;
