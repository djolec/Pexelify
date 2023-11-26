import React from "react";
import { useFetchInfiniteCurated } from "../Hooks/useFetchData";
import PhotoCard from "./PhotoCard";
import { useEffect, useLayoutEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { PulseLoader } from "react-spinners";
import "../style.css";

const CuratedPhotos = () => {
  const { setPageSelected, setPhotosOrVideos } = useContext(AppContext);

  const {
    data,
    error,
    isError,
    fetchNextPage,
    isSuccess,
    isPending,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useFetchInfiniteCurated();

  useLayoutEffect(() => {
    setPageSelected("Photos");
    setPhotosOrVideos("Photos");
    refetch();
  }, []);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 50;

    if (bottom) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const screenWidth = window.innerWidth;
  const numberOfColumns = screenWidth < 768 ? 2 : 3;

  const finalColumns = Array.from({ length: numberOfColumns }, () => []);
  let finalColumnHeights = Array(numberOfColumns).fill(0);

  const calculateFn = (photoData, columnHeights, columns) => {
    photoData.forEach((imageObj) => {
      const smallestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columns[smallestColumnIndex].push(imageObj);
      columnHeights[smallestColumnIndex] += imageObj.height / imageObj.width;
    });
  };

  const processPages = () => {
    data?.pages.forEach((group) => {
      const columns = Array.from({ length: numberOfColumns }, () => []);
      const columnHeights = Array(numberOfColumns).fill(0);
      calculateFn(group.data.photos, columnHeights, columns);
      columns.forEach((column, index) => {
        const shortestFinalColumnIndex = finalColumnHeights.indexOf(
          Math.min(...finalColumnHeights)
        );
        const longestColumnIndex = columnHeights.indexOf(
          Math.max(...columnHeights)
        );
        finalColumns[shortestFinalColumnIndex].push(
          ...columns[longestColumnIndex]
        );
        finalColumnHeights[shortestFinalColumnIndex] +=
          columnHeights[longestColumnIndex];
        columnHeights[longestColumnIndex] = -1;
      });
    });
    const render = finalColumns.map((column, index) => {
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
    return render;
  };

  return (
    <section
      className="flex-grow w-full flex flex-row
       justify-center items-start"
    >
      <div className="md:w-[70%] w-full">
        <h1 className="w-full text-left text-2xl mb-4 text-[var(--on-background)]">
          Curated photos
        </h1>
        <div
          className={`grid ${
            numberOfColumns === 2 ? "grid-cols-2" : "grid-cols-3"
          }  gap-4`}
        >
          {processPages()}
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

export default CuratedPhotos;
