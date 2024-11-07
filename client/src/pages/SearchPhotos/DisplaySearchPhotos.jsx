import { useSearchParams } from "react-router-dom";
import Filter from "../../ui/Filter";
import useSearchPhotos from "../../features/photos/useSearchPhotos";
import Loader from "../../ui/Loader";
import useDistributeMedia from "../../hooks/useDistributeMedia";
import useFetchWhenScrollToBottom from "../../hooks/useFetchWhenScrollToBottom";
import PhotoCard from "../../ui/PhotoCard";
import toast from "react-hot-toast";
import { useEffect } from "react";

const DisplaySearchPhotos = ({ parentRef }) => {
  const [searchParams] = useSearchParams();
  const { data, error, isError, fetchNextPage, isFetching } = useSearchPhotos();

  const distributeMedia = useDistributeMedia();

  // Get the search query from the URL
  const query = searchParams.get("query");

  // Effect to show toast if no query is present
  useEffect(() => {
    if (!query) {
      toast.error("Please enter a search term to find photos."); // Show toast notification
    }
  }, [query]);

  useFetchWhenScrollToBottom(parentRef, fetchNextPage, isFetching);

  return (
    <section className="mx-auto w-full flex-grow px-4 sm:px-8 md:w-[70%]">
      <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:mb-8 2xl:text-5xl">
        {searchParams.get("query")} photos
      </h1>

      <Filter />

      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 2xl:gap-6`}>
        {distributeMedia(data, "photos").map((column, index) => {
          return (
            <div key={index} className="flex flex-col pb-10">
              {column.map((card, index) => {
                const {
                  alt,
                  id,
                  avg_color,
                  width,
                  height,
                  src: { medium },
                } = card;
                return (
                  <PhotoCard
                    key={`${index}${id}`}
                    alt={alt}
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
        })}
      </div>

      {isFetching && <Loader />}

      {isError && (
        <h1 className="mt-20 w-full whitespace-nowrap text-center text-2xl text-[var(--on-background)]">
          {error.message}
        </h1>
      )}

      {data?.pages[0]?.data?.total_results === 0 && (
        <h1 className="mt-20 w-full whitespace-nowrap text-center text-2xl text-[var(--on-background)]">
          No photos match the criteria.
        </h1>
      )}
    </section>
  );
};

export default DisplaySearchPhotos;
