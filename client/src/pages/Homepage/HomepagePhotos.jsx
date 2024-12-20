import { useNavigate } from "react-router-dom";
import useHomepagePhotos from "../../features/photos/useHomepagePhotos";

import PhotoCard from "../../ui/PhotoCard";
import Loader from "../../ui/Loader";
import { useAuth } from "../../context/AuthContext";
import useSavePhoto from "../../features/photos/useSavePhoto";
import useDeletePhoto from "../../features/photos/useDeletePhoto";

const HomepagePhotos = () => {
  const navigate = useNavigate();

  const { data, isError, error, isLoading } = useHomepagePhotos();

  const { auth } = useAuth();
  const { addPhoto } = useSavePhoto();
  const { removePhoto } = useDeletePhoto();

  return (
    <section className="relative mx-auto mt-8 w-full overflow-hidden px-4 sm:px-8 md:w-[70%]">
      {data?.data && (
        <div className="hsl-basic pointer-events-none absolute bottom-0 left-1/2 z-[15] h-36 w-full -translate-x-1/2">
          <button
            onClick={() => navigate("/photos/curated")}
            className="pointer-events-auto absolute bottom-12 left-1/2 w-fit -translate-x-1/2 rounded-full bg-[var(--primary)] px-4 py-2 text-[var(--on-primary)] 2xl:bottom-14 2xl:px-6 2xl:py-4 2xl:text-3xl"
          >
            Explore more
          </button>
        </div>
      )}
      <div className={`${isError ? "h-[100vh]" : "h-[200vh]"} relative w-full`}>
        <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:mb-8 2xl:text-5xl">
          Featured photos
        </h1>
        <div className="columns-2 sm:columns-3 2xl:gap-6">
          {data?.data.photos.map((card) => {
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
                key={id}
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
        {isLoading && <Loader position={"absolute"} />}
        {isError && (
          <h1 className="mt-20 w-full whitespace-nowrap text-center text-2xl text-[var(--on-background)]">
            {error.message}
          </h1>
        )}
      </div>
    </section>
  );
};

export default HomepagePhotos;
