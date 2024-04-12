import React from "react";
import { useEffect } from "react";
import { useFetchAllCollections } from "../hooks/useFetchData";
import { handleScroll } from "../utils/handleScroll";
import CollectionCard from "./CollectionCard";
import Loader from "./Loader";

const FeaturedCollections = () => {
  const { data, error, isError, fetchNextPage, isFetching } =
    useFetchAllCollections();

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

  return (
    <section className="w-full flex-grow md:w-[70%]">
      <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:text-5xl">
        Featured collections
      </h1>
      <div className="pb-8">
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
      {isFetching && <Loader />}
      {isError && (
        <h1 className="mt-20 w-full whitespace-nowrap text-center text-2xl text-[var(--on-background)]">
          {error.message}
        </h1>
      )}
    </section>
  );
};

export default FeaturedCollections;
