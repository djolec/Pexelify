import useFeaturedCollections from "../../features/collections/useFeaturedCollections";
import useFetchWhenScrollToBottom from "../../hooks/useFetchWhenScrollToBottom";
import CollectionCard from "../../ui/CollectionCard";
import Loader from "../../ui/Loader";
import { motion } from "framer-motion";

const DisplayFeaturedCollections = ({ parentRef }) => {
  const { data, isFetching, error, isError, fetchNextPage } =
    useFeaturedCollections();

  useFetchWhenScrollToBottom(parentRef, fetchNextPage, isFetching);

  return (
    <section className="w-full flex-grow md:w-[70%] mx-auto sm:px-8 px-4">
      <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:mb-8 2xl:text-5xl">
        Featured collections
      </h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="pb-8"
      >
        {data?.pages.map((page, index) => {
          return (
            <div
              key={index}
              className="relative grid grid-cols-card gap-x-4 2xl:grid-cols-cardBig 2xl:gap-x-6"
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
      </motion.div>
      {isFetching && <Loader />}
      {isError && (
        <h1 className="mt-20 w-full whitespace-nowrap text-center text-2xl text-[var(--on-background)]">
          {error.message}
        </h1>
      )}
    </section>
  );
};

export default DisplayFeaturedCollections;
