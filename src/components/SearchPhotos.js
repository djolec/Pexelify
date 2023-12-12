import React from "react";
import { useContext, useEffect, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchPhotos } from "../Hooks/useFetchData";
import { PulseLoader } from "react-spinners";
import PhotoCard from "./PhotoCard";
import Filter from "./Filter";
import { AppContext } from "../App";
import { distributeMedia } from "../helper/columnUtils";
import { handleScroll } from "../helper/handleScroll";

const SearchPhotos = () => {
  const { searchObj, setPageSelected, numberOfColumns, bigScreen } =
    useContext(AppContext);
  const { id } = useParams();

  const { data, error, isError, fetchNextPage, isFetching, refetch } =
    useSearchPhotos(id, searchObj);

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    setPageSelected("Photos");
  }, []);

  useEffect(
    () => {
      refetch();
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
      "photos",
      numberOfColumns,
    ).map((column, index) => {
      return (
        <div key={index} className="flex flex-col gap-4 pb-10">
          {column.map((card, cardIndex) => {
            const {
              id,
              avg_color,
              width,
              height,
              src: { medium },
            } = card;
            return (
              <PhotoCard
                key={`${id}${index}${cardIndex}`}
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
    <section
      className="flex w-full flex-grow flex-row
       items-start justify-center"
    >
      <div className="flex w-full flex-col gap-8 md:w-[70%]">
        <div>
          <h1 className="mx-auto mb-2 w-full text-left text-2xl text-[var(--on-background)] 2xl:mb-3 2xl:text-4xl">
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
            className="self-center pb-20"
            size={`${bigScreen ? "45px" : "25px"}`}
            color="var(--on-background)"
          />
        )}
        {data?.pages[0].data.total_results === 0 && (
          <h1 className="w-full text-left text-2xl text-[var(--on-background)]">
            We couldn't find any matching photos. Consider changing the search
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

export default SearchPhotos;
