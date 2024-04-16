import React from "react";
import { useFetchHomepageCollections } from "../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import CollectionCard from "./CollectionCard";
import Loader from "./Loader";

const HomepageCollections = () => {
  const navigate = useNavigate();

  const fetchParam = "page=1&per_page=18";

  const { data, isError, error, isLoading } =
    useFetchHomepageCollections(fetchParam);

  return (
    <section className="relative w-full overflow-hidden md:w-[70%]">
      <div className="relative min-h-[50vh] w-full">
        <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:mb-8 2xl:text-5xl">
          Featured collections
        </h1>
        <div className="columns-2 sm:columns-3 2xl:gap-6">
          {data?.data.collections.map((collection) => {
            const { title, media_count, id } = collection;
            return (
              <CollectionCard
                title={title}
                mediaCount={media_count}
                collectionID={id}
                key={id}
              />
            );
          })}
        </div>
        {isLoading && <Loader position={"absolute"} />}
        {isError && (
          <h1 className="mt-20 w-full whitespace-nowrap text-center text-2xl text-[var(--on-background)]">
            {error.message}
          </h1>
        )}
      </div>
      {data?.data && (
        <button
          onClick={() => navigate("/collections/featured")}
          className="mx-auto mt-6 block w-fit rounded-full bg-[var(--tertiary)] px-4 py-2 text-[var(--on-primary)] 2xl:bottom-14 2xl:px-6 2xl:py-4 2xl:text-3xl"
        >
          Explore more
        </button>
      )}
    </section>
  );
};

export default HomepageCollections;
