import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchPhotos } from "../Hooks/useFetchData";
import { PulseLoader } from "react-spinners";
import PhotoCard from "./PhotoCard";
import Filter from "./Filter";
import { AppContext } from "../App";

const SearchPhotos = () => {
  const { searchObj, setPageSelected } = useContext(AppContext);
  const { id } = useParams();

  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useSearchPhotos(id, searchObj);

  useEffect(() => {
    setPageSelected("Photos");
  }, []);

  useEffect(
    () => {
      refetch();
    },
    [searchObj],
    [id]
  );

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 500;

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
        <div key={index} className="flex flex-col gap-4">
          {column.map((card) => {
            return (
              <PhotoCard
                key={card.id}
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
      <div className="md:w-[70%] w-full flex flex-col gap-8">
        <div>
          <h1 className="mx-auto w-full mb-2 text-left text-2xl text-[var(--on-background)]">
            {id} photos
          </h1>
          <Filter />
        </div>
        <div
          className={`grid ${
            numberOfColumns === 2 ? "grid-cols-2" : "grid-cols-3"
          } gap-4`}
        >
          {processPages()}
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

export default SearchPhotos;
