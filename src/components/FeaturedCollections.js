import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { useFetchFeaturedCollections } from "../Hooks/useFetchData";
import CollectionCard from "./CollectionCard";
import { Link } from "react-router-dom";
import { PulseLoader } from "react-spinners";
import { motion } from "framer-motion";

const FeaturedCollections = () => {
  const { setPageSelected } = useContext(AppContext);

  const fetchParam = "page=1&per_page=18";
  const { data, isLoading, isFetching, isError, error } =
    useFetchFeaturedCollections(fetchParam);

  return (
    <section
      className={`flex-grow w-full relative overflow-hidden flex flex-row ${
        isFetching || isError ? "h-[600px]" : "null"
      } justify-center items-start`}
    >
      <div className="md:w-[70%] w-full flex flex-col custom-div gap-1 justify-start relative">
        <h1 className="text-left text-2xl mb-4 text-[var(--on-background)]">
          Featured collections
        </h1>
        <div className="grid grid-cols-card gap-x-4 relative w-full">
          {data?.data && !isFetching
            ? data.data.collections.map((collection) => {
                return (
                  <CollectionCard
                    title={collection.title}
                    mediaCount={collection.media_count}
                    collectionID={collection.id}
                    key={collection.id}
                  />
                );
              })
            : null}
          {isFetching && (
            <div className="pb-20 absolute top-20 left-1/2 -translate-x-1/2">
              <PulseLoader size={25} color="var(--on-background)" />
            </div>
          )}
          {isError && (
            <h1 className="w-full text-2xl text-left text-[var(--on-background)]">
              {error.message}
            </h1>
          )}
        </div>
        {data?.data && (
          <Link to={`/media/collections/featured`}>
            <button
              onClick={() => setPageSelected("Collections")}
              className="px-4 py-2 mt-3 bg-[var(--tertiary)] text-[var(--on-primary)] rounded-full w-fit"
            >
              Explore more
            </button>
          </Link>
        )}
      </div>
    </section>
  );
};

export default FeaturedCollections;
