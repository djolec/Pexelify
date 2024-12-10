import usePopularVideos from "../../features/videos/usePopularVideos";
import useDistributeMedia from "../../hooks/useDistributeMedia";
import useFetchWhenScrollToBottom from "../../hooks/useFetchWhenScrollToBottom";
import Loader from "../../ui/Loader";
import VideoCard from "../../ui/VideoCard";
import { useContext, useMemo } from "react";
import { AppContext } from "../../App";
import useSaveVideo from "../../features/videos/useSaveVideo";
import useDeleteVideo from "../../features/videos/useDeleteVideo";
import { useAuth } from "../../context/AuthContext";

const DisplayPopularVideos = ({ parentRef }) => {
  const { data, error, isError, fetchNextPage, isFetching } =
    usePopularVideos();
  const { addVideo } = useSaveVideo();
  const { removeVideo } = useDeleteVideo();
  const { auth } = useAuth();

  const distributeMedia = useDistributeMedia();

  // Memoize the result of distributeMedia
  const distributedVideos = useMemo(() => {
    return distributeMedia(data, "videos");
  }, [data]);

  const { isMobile } = useContext(AppContext);

  useFetchWhenScrollToBottom(parentRef, fetchNextPage, isFetching);

  return (
    <section className="relative mx-auto w-full flex-grow px-4 sm:px-8 md:w-[70%]">
      <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:mb-8 2xl:text-5xl">
        Popular videos
      </h1>

      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3 2xl:gap-6`}>
        {distributedVideos.map((column, index) => {
          return (
            <div key={index} className="flex flex-col pb-10">
              {column.map((card) => {
                const { id, video_files, video_pictures } = card;
                const sortedVideos = video_files.sort(
                  (a, b) => a.width - b.width,
                );
                const image = video_pictures[0].picture;
                const { width, height, link } = sortedVideos[0];
                const isSaved = auth?.media?.videos?.find(
                  (video) => video.id === id,
                );

                return (
                  <VideoCard
                    key={id}
                    isMobile={isMobile}
                    source={link}
                    cardWidth={width}
                    cardHeight={height}
                    videoID={id}
                    videoImg={image}
                    isSaved={isSaved}
                    addVideo={addVideo}
                    removeVideo={removeVideo}
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

export default DisplayPopularVideos;
