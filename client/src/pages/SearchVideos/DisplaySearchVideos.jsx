import { useSearchParams } from "react-router-dom";
import Filter from "../../ui/Filter";
import useSearchVideos from "../../features/videos/useSearchVideos";
import Loader from "../../ui/Loader";
import useDistributeMedia from "../../hooks/useDistributeMedia";
import useFetchWhenScrollToBottom from "../../hooks/useFetchWhenScrollToBottom";
import VideoCard from "../../ui/VideoCard";
import toast from "react-hot-toast";
import { useEffect, useMemo } from "react";
import { useContext } from "react";
import { AppContext } from "../../App";
import useSaveVideo from "../../features/videos/useSaveVideo";
import useDeleteVideo from "../../features/videos/useDeleteVideo";
import { useAuth } from "../../context/AuthContext";

const DisplaySearchVideos = ({ parentRef }) => {
  const [searchParams] = useSearchParams();
  const { data, error, isError, fetchNextPage, isFetching } = useSearchVideos();
  const { isMobile } = useContext(AppContext);

  const { addVideo } = useSaveVideo();
  const { removeVideo } = useDeleteVideo();
  const { auth } = useAuth();

  const distributeMedia = useDistributeMedia();

  // Memoize the result of distributeMedia
  const distributedVideos = useMemo(() => {
    return distributeMedia(data, "videos");
  }, [data]);

  // Get the search query from the URL
  const query = searchParams.get("query");

  // Effect to show toast if no query is present
  useEffect(() => {
    if (!query) {
      toast.error("Please enter a search term to find videos.");
    }
  }, [query]);

  useFetchWhenScrollToBottom(parentRef, fetchNextPage, isFetching);

  return (
    <section className="mx-auto w-full flex-grow px-4 sm:px-8 md:w-[70%]">
      <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:mb-8 2xl:text-5xl">
        {searchParams.get("query")} videos
      </h1>

      <Filter />

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

      {data?.pages[0]?.data?.total_results === 0 && (
        <h1 className="mt-20 w-full whitespace-nowrap text-center text-2xl text-[var(--on-background)]">
          No videos match the criteria.
        </h1>
      )}
    </section>
  );
};

export default DisplaySearchVideos;
