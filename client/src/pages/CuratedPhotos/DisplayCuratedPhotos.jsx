import useCuratedPhotos from "../../features/photos/useCuratedPhotos";
import useDistributeMedia from "../../hooks/useDistributeMedia";
import PhotoCard from "../../ui/PhotoCard";
import useFetchWhenScrollToBottom from "../../hooks/useFetchWhenScrollToBottom";
import Loader from "../../ui/Loader";
import { useMemo } from "react";
import { useAuth } from "../../context/AuthContext";
import useSavePhoto from "../../features/photos/useSavePhoto";
import useDeletePhoto from "../../features/photos/useDeletePhoto";

const DisplayCuratedPhotos = ({ parentRef }) => {
  const { data, error, isError, fetchNextPage, isFetching } =
    useCuratedPhotos();

  const { auth } = useAuth();
  const { addPhoto } = useSavePhoto();
  const { removePhoto } = useDeletePhoto();

  const distributeMedia = useDistributeMedia();

  useFetchWhenScrollToBottom(parentRef, fetchNextPage, isFetching);

  // Memoize the result of distributeMedia
  const distributedPhotos = useMemo(() => {
    return distributeMedia(data, "photos");
  }, [data]);

  return (
    <section className="mx-auto w-full flex-grow px-4 sm:px-8 md:w-[70%]">
      <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:mb-8 2xl:text-5xl">
        Curated photos
      </h1>

      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 2xl:gap-6`}>
        {distributedPhotos.map((column, index) => {
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

                const isSaved = auth?.media?.photos?.find(
                  (saved) => saved.id === id,
                );
                return (
                  <PhotoCard
                    key={`${index}${id}`}
                    alt={alt}
                    bgColor={avg_color}
                    source={medium}
                    photoWidth={width}
                    photoHeight={height}
                    photoID={id}
                    isSaved={isSaved}
                    addPhoto={addPhoto}
                    removePhoto={removePhoto}
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
