import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchPhotos } from "../Hooks/useFetchData";
import { PulseLoader } from "react-spinners";
import PhotoCard from "./PhotoCard";
import Filter from "./Filter";
import { AppContext } from "../App";
import { distributeMedia } from "../helper/columnUtils";

const SearchPhotos = () => {
  const { searchObj, setPageSelected, handleScroll, numberOfColumns } =
    useContext(AppContext);
  const { id } = useParams();

  const { data, error, isError, fetchNextPage, isFetching, refetch } =
    useSearchPhotos(id, searchObj);

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
      numberOfColumns
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

export default SearchPhotos;
