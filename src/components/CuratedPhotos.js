import React from "react";
import { useFetchInfiniteCurated } from "../Hooks/useFetchData";
import PhotoCard from "./PhotoCard";
import { useEffect, useLayoutEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { PulseLoader } from "react-spinners";
import { distributeMedia } from "../helper/columnUtils";
import { handleScroll } from "../helper/handleScroll";
import "../style.css";

const CuratedPhotos = () => {
  const { setPageSelected, setPhotosOrVideos, numberOfColumns, bigScreen } =
    useContext(AppContext);

  const { data, error, isError, fetchNextPage, isFetching, refetch } =
    useFetchInfiniteCurated();

  useLayoutEffect(() => {
    setPageSelected("Photos");
    setPhotosOrVideos("Photos");
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
      "photos",
      numberOfColumns,
    ).map((column, index) => {
      return (
        <div key={index} className="flex flex-col gap-4 pb-10">
          {column.map((card, cardIndex) => {
            return (
              <PhotoCard
                key={`${card.id}${index}${cardIndex}`}
                bgColor={card.avg_color}
                source={card.src.medium}
                photoWidth={card.width}
                photoHeight={card.height}
                photoID={card.id}
              />
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
        <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:text-5xl">
          Curated photos
        </h1>
        <div
          className={`grid ${
            numberOfColumns === 2 ? "grid-cols-2" : "grid-cols-3"
          }  gap-4`}
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

export default CuratedPhotos;
