import React, { useMemo } from "react";
import { useState } from "react";
import { useFetchCuratedPhotos } from "../hooks/useFetchData";
import { handleScroll } from "../utils/handleScroll";
import { distributeMedia } from "../utils/columnUtils";
import { useNumberOfColumns } from "../hooks/useNumberOfColumns";
import { useEffect } from "react";
import PhotoCard from "./PhotoCard";
import Loader from "./Loader";

const CuratedPhotos = () => {
  const { numberOfColumns } = useNumberOfColumns();
  const [mediaColumns, setMediaColumns] = useState(
    Array.from({ length: numberOfColumns }, () => []),
  );
  const [mediaColumnHeights, setMediaColumnHeights] = useState(
    Array(numberOfColumns).fill(0),
  );

  const { data, error, isError, fetchNextPage, isFetching } =
    useFetchCuratedPhotos();

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

  // const finalColumns = Array.from({ length: numberOfColumns }, () => []);
  // let finalColumnHeights = Array(numberOfColumns).fill(0);

  const calculateColumns = (mediaData, type) => {
    const columns = Array.from({ length: numberOfColumns }, () => []);
    const columnHeights = Array(numberOfColumns).fill(0);
    mediaData?.data[type].forEach((mediaObj) => {
      const smallestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights),
      );
      columns[smallestColumnIndex].push(mediaObj);
      columnHeights[smallestColumnIndex] += mediaObj.height / mediaObj.width;
    });

    const mediaColumnsCopy = [...mediaColumns];
    const mediaColumnHeightsCopy = [...mediaColumnHeights];

    columns.forEach(() => {
      const shortestFinalColumnIndex = mediaColumnHeightsCopy.indexOf(
        Math.min(...mediaColumnHeightsCopy),
      );
      const longestColumnIndex = columnHeights.indexOf(
        Math.max(...columnHeights),
      );
      mediaColumnsCopy[shortestFinalColumnIndex].push(
        ...columns[longestColumnIndex],
      );
      mediaColumnHeightsCopy[shortestFinalColumnIndex] +=
        columnHeights[longestColumnIndex];
      columnHeights[longestColumnIndex] = -1;
    });

    setMediaColumns(mediaColumnsCopy);
    setMediaColumnHeights(mediaColumnHeightsCopy);
  };

  useEffect(() => {
    calculateColumns(data?.pages[data.pages.length - 1], "photos");
  }, [data]);

  // const finalColumns = Array.from({ length: numberOfColumns }, () => []);
  // let finalColumnHeights = Array(numberOfColumns).fill(0);

  // const renderMedia = () => {
  //   return distributeMedia(
  //     data,
  //     finalColumns,
  //     finalColumnHeights,
  //     "photos",
  //     numberOfColumns,
  //   ).map((column, index) => {
  //     return (
  //       <div key={index} className="flex flex-col pb-10">
  //         {column.map((card, index) => {
  //           const {
  //             alt,
  //             id,
  //             avg_color,
  //             width,
  //             height,
  //             src: { medium },
  //           } = card;
  //           return (
  //             <PhotoCard
  //               key={`${index}${id}`}
  //               alt={alt}
  //               bgColor={avg_color}
  //               source={medium}
  //               photoWidth={width}
  //               photoHeight={height}
  //               photoID={id}
  //             />
  //           );
  //         })}
  //       </div>
  //     );
  //   });
  // };

  const renderMedia = useMemo(() => {
    return mediaColumns.map((column, index) => {
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
  }, [mediaColumns]);

  return (
    <section className="w-full flex-grow md:w-[70%]">
      <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:mb-8 2xl:text-5xl">
        Curated photos
      </h1>
      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 2xl:gap-6`}>
        {renderMedia}
        {/* {mediaColumns.map((column, index) => {
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
        })} */}
        {/* {renderMedia()} */}
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
