import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import useVideosById from "../../features/videos/useVideosById";
import DownloadBtn from "../../ui/DownloadBtn";
import ThemeBtn from "../../ui/ThemeBtn";
import BackBtn from "../../ui/BackBtn";
import Footer from "../../ui/Footer";
import FavoriteBtn from "../../ui/FavoriteBtn";
import useSaveVideo from "../../features/videos/useSaveVideo";
import useDeleteVideo from "../../features/videos/useDeleteVideo";
import { useAuth } from "../../context/AuthContext";

const VideoDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useVideosById(id);
  const [isErrorDownloading, setIsErrorDownloading] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isErrorPlaying, setIsErrorPlaying] = useState(false);
  const { addVideo } = useSaveVideo();
  const { removeVideo } = useDeleteVideo();
  const { auth } = useAuth();

  const {
    video_files,
    video_pictures,
    width,
    height,
    user: { name } = {},
  } = data?.data || {};

  const qualityLinkArray = video_files
    ?.sort((a, b) => a.width - b.width)
    .map(({ quality, link, width, height }) => [
      `${quality} ${width}x${height}`,
      link,
    ]);

  const isSaved = auth?.media?.videos?.find((video) => video.id === Number(id));

  const newVideo = {
    id: Number(id),
    width,
    height,
    src: video_files && video_files.length > 0 ? video_files[0].link : null,
    image:
      video_pictures && video_pictures.length > 0
        ? video_pictures[0].picture
        : null,
  };

  return (
    <div className="relative flex min-h-screen w-full flex-grow flex-col bg-[var(--background)] px-4 sm:px-8">
      <div className="flex flex-row items-center justify-between py-6">
        <BackBtn />

        <div className="flex flex-row items-center gap-3">
          {isErrorDownloading && (
            <span className="text-lg text-[var(--on-background)]">
              {isErrorDownloading}
            </span>
          )}

          <DownloadBtn
            data={qualityLinkArray}
            id={id}
            setIsErrorDownloading={setIsErrorDownloading}
          />

          <div className="block rounded-full bg-[var(--surface)] text-[var(--on-background)] transition-colors duration-100 hover:bg-[var(--surface-variant)]">
            <FavoriteBtn
              add={() => addVideo(newVideo)}
              remove={() => removeVideo(isSaved._id)}
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
                backgroundColor: "#333",
                aspectRatio: `${width}/${height}`,
              }}
              className="relative h-auto w-full overflow-hidden rounded-2xl md:h-[70vh] md:w-auto"
            >
              {isErrorPlaying && (
                <h1 className="absolute left-1/2 top-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center text-2xl text-white">
                  Video resource could not be loaded.
                </h1>
              )}

              <motion.div
                className="h-full w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: isLoaded ? 1 : 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ReactPlayer
                  config={{
                    file: { attributes: { controlsList: "nodownload" } },
                  }}
                  width="100%"
                  height="100%"
                  controls
                  url={qualityLinkArray[qualityLinkArray.length - 3][1]}
                  onReady={() => setIsLoaded(true)}
                  onError={() => setIsErrorPlaying(true)}
                />
              </motion.div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0 }}
              className="2xl:text-3xl"
            >
              <span className="text-[var(--on-background)]">Video by </span>
              <span className="font-semibold text-[var(--primary)]">
                {name}
              </span>
            </motion.h1>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default VideoDetails;
