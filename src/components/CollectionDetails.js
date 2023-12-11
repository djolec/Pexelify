import React from "react";
import { useContext, useEffect, useLayoutEffect } from "react";
import { AppContext } from "../App";
import { useParams } from "react-router-dom";
import { useFetchCollectionById } from "../Hooks/useFetchData";
import { PulseLoader } from "react-spinners";
import PhotoCard from "./PhotoCard";
import VideoCard from "./VideoCard";
import { distributeMedia } from "../helper/columnUtils";
import { handleScroll } from "../helper/handleScroll";

const CollectionDetails = () => {
  const { setPageSelected, currentCollTitle, numberOfColumns, bigScreen } =
    useContext(AppContext);
  const { id } = useParams();

  const { data, refetch, fetchNextPage, isFetching, isError, error } =
    useFetchCollectionById(id);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    setPageSelected("Collections");
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
      "media",
      numberOfColumns,
    ).map((column, index) => {
      return (
        <div key={index} className="flex flex-col gap-4 pb-20">
          {column.map((card) => {
            if (card.type === "Video") {
              const { id, image, video_files } = card;
              const sortedVideos = video_files.sort(
                (a, b) => a.width - b.width,
              );
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
            } else {
              const {
                id,
                avg_color,
                width,
                height,
                src: { medium },
              } = card;
              return (
                <PhotoCard
                  key={id}
                  bgColor={avg_color}
                  source={medium}
                  photoWidth={width}
                  photoHeight={height}
                  photoID={id}
                />
              );
            }
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
        <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)]">
          {currentCollTitle}
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
            size={`${bigScreen ? 45 : 25}`}
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

export default CollectionDetails;
