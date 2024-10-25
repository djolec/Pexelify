import { useParams } from "react-router-dom";
import usePhotosById from "../../features/photos/usePhotosById";
import ThemeBtn from "../../ui/ThemeBtn";
import BackBtn from "../../ui/BackBtn";
import { motion } from "framer-motion";
import DownloadBtn from "../../ui/DownloadBtn";
import Footer from "../../ui/Footer";
import { useAuth } from "../../context/AuthContext";
import useSavePhoto from "../../features/photos/useSavePhoto";
import useDeletePhoto from "../../features/photos/useDeletePhoto";
import FavoriteBtn from "../../ui/FavoriteBtn";

const PhotoDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = usePhotosById(id);
  const { auth } = useAuth();
  const { addPhoto } = useSavePhoto();
  const { removePhoto } = useDeletePhoto();

  const {
    src,
    src: { medium } = {},
    src: { large } = {},
    alt,
    height,
    width,
    photographer,
    avg_color,
  } = data?.data || {};

  const isSaved = auth?.media?.photos?.find((photo) => photo.id === Number(id));

  const newPhoto = {
    id: Number(id),
    width,
    height,
    src: medium,
    avg_color,
    alt,
  };

  let srcArray = [];
  if (src) {
    srcArray = Object.entries(src).map(([key, value]) => [key, value]);
  }

  return (
    <div className="relative w-full flex-grow px-4 sm:px-8 bg-[var(--background)] min-h-screen flex flex-col">
      <div className="flex py-6 flex-row items-center justify-between">
        <BackBtn />

        <div className="flex flex-row items-center gap-3">
          <DownloadBtn data={srcArray} id={id} />

          <div className="rounded-full bg-[var(--surface)] text-[var(--on-background)] transition-colors duration-100 hover:bg-[var(--surface-variant)] block">
            <FavoriteBtn
              add={() => addPhoto(newPhoto)}
              remove={() => removePhoto(isSaved._id)}
              isSaved={isSaved}
              fill="fill-[var(--on-background)]"
            />
          </div>

          <ThemeBtn />
        </div>
      </div>

      <div className="grow">
        {isLoading && (
          <span className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-[var(--on-background)] 2xl:text-5xl">
            Loading...
          </span>
        )}

        {isError && (
          <h1 className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-[var(--on-background)]">
            {error.message}
          </h1>
        )}

        {data?.data && (
          <div className="flex flex-col items-center gap-2">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              style={{
                aspectRatio: `${width}/${height}`,
                backgroundColor: `${avg_color}`,
              }}
              className="h-auto w-full  overflow-hidden rounded-2xl
        md:h-[70vh] md:w-auto"
            >
              <motion.img
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="block h-full w-full"
                src={large}
                alt={alt}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="2xl:text-3xl"
            >
              <span className="text-[var(--on-background)]">
                Photograph by{" "}
              </span>
              <span className="font-semibold text-[var(--primary)]">
                {photographer}
              </span>
            </motion.h1>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default PhotoDetails;
