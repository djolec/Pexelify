import React from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { handleScroll } from "../utils/handleScroll";
import { useFetchCollectionById } from "../hooks/useFetchData";
import { distributeMedia } from "../utils/columnUtils";
import { useNumberOfColumns } from "../hooks/useNumberOfColumns";
import PhotoCard from "./PhotoCard";
import VideoCard from "./VideoCard";
import Loader from "./Loader";

const CollectionDetails = () => {
  const { id, name } = useParams();
  const { numberOfColumns } = useNumberOfColumns();

  const { data, fetchNextPage, isFetching, isError, error } =
    useFetchCollectionById(id);

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
      "media",
      numberOfColumns,
    ).map((column, index) => {
      return (
        <div key={index} className="flex flex-col pb-10">
          {column.map((card) => {
            if (card.type === "Video") {
              const { id, video_files, video_pictures } = card;
              const sortedVideos = video_files.sort(
                (a, b) => a.width - b.width,
              );
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
            } else {
              const {
                alt,
                id,
                avg_color,
                width,
                height,
                src: { medium },
              } = card;
              return (
                <PhotoCard
                  key={id}
                  alt={alt}
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
    <section className="w-full flex-grow md:w-[70%]">
      <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:text-5xl">
        {name}
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

export default CollectionDetails;
