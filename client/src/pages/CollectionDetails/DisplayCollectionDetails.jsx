import { useParams } from "react-router-dom";
import PhotoCard from "../../ui/PhotoCard";
import VideoCard from "../../ui/VideoCard";
import Loader from "../../ui/Loader";
import useCollectionsById from "../../features/collections/useCollectionsById";
import useDistributeMedia from "../../hooks/useDistributeMedia";
import useFetchWhenScrollToBottom from "../../hooks/useFetchWhenScrollToBottom";
import { useContext } from "react";
import { AppContext } from "../../App";

const DisplayCollectionDetails = ({ parentRef }) => {
  const { id, name } = useParams();
  const distributeMedia = useDistributeMedia();

  const { isMobile } = useContext(AppContext);

  const { data, fetchNextPage, isFetching, isError, error } =
    useCollectionsById(id);

  useFetchWhenScrollToBottom(parentRef, fetchNextPage, isFetching);

  return (
    <section className="w-full flex-grow md:w-[70%] mx-auto mt-8 relative">
      <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:text-5xl">
        {name}
      </h1>
      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3`}>
        {distributeMedia(data, "media").map((column, index) => {
          return (
            <div key={index} className="flex flex-col pb-10">
              {column.map((card) => {
                if (card.type === "Video") {
                  const { id, video_files, video_pictures } = card;
                  const sortedVideos = video_files.sort(
                    (a, b) => a.width - b.width
                  );
                  const image = video_pictures[0].picture;
                  const { width, height, link } = sortedVideos[0];
                  return (
                    <VideoCard
                      key={id}
                      isMobile={isMobile}
                      source={link}
                      cardWidth={width}
                      cardHeight={height}
                      videoID={id}
                      videoImg={image}
                    />
                  );
                } else {
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
                      key={id}
                      alt={alt}
                      bgColor={avg_color}
                      source={medium}
                      photoWidth={width}
                      photoHeight={height}
                      photoID={id}
                    />
                  );
                }
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

export default DisplayCollectionDetails;
