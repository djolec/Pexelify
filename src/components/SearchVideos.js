import React from "react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchVideos } from "../Hooks/useFetchData";
import { PulseLoader } from "react-spinners";
import VideoCard from "./VideoCard";
import Filter from "./Filter";
import { AppContext } from "../App";
import { distributeMedia } from "../helper/columnUtils";
import { handleScroll } from "../helper/handleScroll";

const SearchVideos = () => {
  const { searchObj, setPageSelected, numberOfColumns, bigScreen } =
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
    [id],
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
      <div className="flex w-full flex-col gap-8 md:w-[70%]">
        <div>
          <h1 className="mx-auto mb-2 w-full text-left text-2xl text-[var(--on-background)]">
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
            className="self-center pb-20"
            size={`${bigScreen ? 45 : 25}`}
            color="var(--on-background)"
          />
        )}
        {data?.pages[0].data.total_results === 0 && (
          <h1 className="w-full text-left text-2xl text-[var(--on-background)]">
            We couldn't find any matching videos. Consider changing the search
            keyword or filter.
          </h1>
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

export default SearchVideos;
