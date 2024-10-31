import useCuratedPhotos from "../../features/photos/useCuratedPhotos";
import useDistributeMedia from "../../hooks/useDistributeMedia";
import PhotoCard from "../../ui/PhotoCard";
import useFetchWhenScrollToBottom from "../../hooks/useFetchWhenScrollToBottom";
import Loader from "../../ui/Loader";

const DisplayCuratedPhotos = ({ parentRef }) => {
  const { data, error, isError, fetchNextPage, isFetching } =
    useCuratedPhotos();

  const distributeMedia = useDistributeMedia();

  useFetchWhenScrollToBottom(parentRef, fetchNextPage, isFetching);

  return (
    <section className="w-full flex-grow md:w-[70%] mx-auto mt-8 sm:px-8 px-4">
      <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:mb-8 2xl:text-5xl">
        Curated photos
      </h1>

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
    </section>
  );
};

export default DisplayCuratedPhotos;
