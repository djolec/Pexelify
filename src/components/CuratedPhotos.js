import React from "react";
import { useFetchCuratedPhotos } from "../hooks/useFetchData";
import { handleScroll } from "../utils/handleScroll";
import { distributeMedia } from "../utils/columnUtils";
import { useNumberOfColumns } from "../hooks/useNumberOfColumns";
import { useEffect } from "react";
import PhotoCard from "./PhotoCard";
import Loader from "./Loader";

const CuratedPhotos = () => {
  const { data, error, isError, fetchNextPage, isFetching } =
    useFetchCuratedPhotos();

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
      "photos",
      numberOfColumns,
    ).map((column, index) => {
      return (
        <div key={index} className="flex flex-col pb-10">
          {column.map((card, index) => {
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
                key={`${index}${id}`}
                alt={alt}
                bgColor={avg_color}
                source={medium}
                photoWidth={width}
                photoHeight={height}
                photoID={id}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <section className="w-full flex-grow md:w-[70%]">
      <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:mb-8 2xl:text-5xl">
        Curated photos
      </h1>
      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 2xl:gap-6`}>
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

export default CuratedPhotos;
