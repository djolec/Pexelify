import React, { useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useFetchFeaturedCollections } from "../Hooks/useFetchData";
import CollectionCard from "./CollectionCard";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";

const FeaturedCollections = () => {
  const { setPageSelected, bigScreen } = useContext(AppContext);

  const fetchParam = "page=1&per_page=18";
  const { data, isLoading, isFetching, isError, error, refetch } =
    useFetchFeaturedCollections(fetchParam);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <section className="relative w-full flex-grow overflow-hidden">
      <div className="relative  mx-auto w-full pt-8 md:w-[70%]">
        <h1 className="mb-4 text-left text-2xl text-[var(--on-background)] 2xl:text-5xl">
          Featured collections
        </h1>
        <div className="relative grid w-full grid-cols-card gap-x-4 2xl:grid-cols-cardBig 2xl:gap-x-6">
          {data?.data.collections.map((collection) => {
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
        {data?.data && (
          <Link to={`/media/collections/featured`}>
            <button
              onClick={() => setPageSelected("Collections")}
              className="mt-6 w-fit rounded-full bg-[var(--tertiary)] px-4 py-2 text-[var(--on-primary)] 2xl:mt-8 2xl:px-6 2xl:py-4 2xl:text-3xl"
            >
              Explore more
            </button>
          </Link>
        )}
      </div>
      {isLoading && (
        <div className="absolute left-1/2 top-20 -translate-x-1/2 pb-20">
          <PulseLoader
            size={`${bigScreen ? "45px" : "25px"}`}
            color="var(--on-background)"
          />
        </div>
      )}
      {isError && (
        <h1 className="w-full text-left text-2xl text-[var(--on-background)]">
          {error.message}
        </h1>
      )}
    </section>
  );
};

export default FeaturedCollections;
