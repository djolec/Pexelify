import React from "react";
import { useEffect, useContext, useLayoutEffect } from "react";
import { AppContext } from "../App";
import { useFetchAllCollections } from "../Hooks/useFetchData";
import CollectionCard from "./CollectionCard";
import { PulseLoader } from "react-spinners";
import { handleScroll } from "../helper/handleScroll";

const AllCollections = () => {
  const { setPageSelected, bigScreen } = useContext(AppContext);

  const { data, error, isError, fetchNextPage, refetch, isFetching } =
    useFetchAllCollections();

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

  return (
    <section
      className="flex w-full flex-grow flex-row
       items-start justify-center"
    >
      <div className="w-full md:w-[70%]">
        <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:text-5xl">
          Featured collections
        </h1>
        <div className="pb-10">
          {data?.pages.map((page, index) => {
            return (
              <div
                key={index}
                className="relative grid grid-cols-card gap-x-4 2xl:grid-cols-cardBig"
              >
                {page.data.collections.map((collection) => {
                  return (
                    <CollectionCard
                      title={collection.title}
                      mediaCount={collection.media_count}
                      collectionID={collection.id}
                      key={collection.id}
                    />
                  );
                })}
              </div>
            );
          })}
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

export default AllCollections;
