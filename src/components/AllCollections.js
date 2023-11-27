import React from "react";
import { useEffect, useContext } from "react";
import { AppContext } from "../App";
import { useFetchAllCollections } from "../Hooks/useFetchData";
import CollectionCard from "./CollectionCard";
import { PulseLoader } from "react-spinners";
import { handleScroll } from "../helper/handleScroll";

const AllCollections = () => {
  const { setPageSelected } = useContext(AppContext);

  const { data, error, isError, fetchNextPage, refetch, isFetching } =
    useFetchAllCollections();

  useEffect(() => {
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
      className="flex-grow w-full flex flex-row
       justify-center items-start"
    >
      <div className="md:w-[70%] w-full">
        <h1 className="w-full text-left text-2xl mb-4 text-[var(--on-background)]">
          Featured collections
        </h1>
        <div className="pb-10">
          {data?.pages.map((page, index) => {
            return (
              <div key={index} className="grid grid-cols-card gap-x-4 relative">
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

export default AllCollections;
