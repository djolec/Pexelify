import { useParams } from "react-router-dom";
import PhotoCard from "../../ui/PhotoCard";
import VideoCard from "../../ui/VideoCard";
import Loader from "../../ui/Loader";
import useCollectionsById from "../../features/collections/useCollectionsById";
import useDistributeMedia from "../../hooks/useDistributeMedia";
import useFetchWhenScrollToBottom from "../../hooks/useFetchWhenScrollToBottom";
import { useContext } from "react";
import { AppContext } from "../../App";
import { useNavigate } from "react-router-dom";
import ArrowLeft from "../../assets/svg/arrow-left-solid.svg?react";

const DisplayCollectionDetails = ({ parentRef }) => {
  const { id, name } = useParams();
  const distributeMedia = useDistributeMedia();

  const { isMobile } = useContext(AppContext);
  const navigate = useNavigate();

  const { data, fetchNextPage, isFetching, isError, error } =
    useCollectionsById(id);

  useFetchWhenScrollToBottom(parentRef, fetchNextPage, isFetching);

  return (
    <section className="relative mx-auto w-full flex-grow px-4 sm:px-8 md:w-[70%]">
      <div className="mb-4 flex flex-col-reverse gap-2">
        <h1 className="w-fit text-left text-2xl text-[var(--on-background)] 2xl:text-5xl">
          {name}
        </h1>
        <button
          className="flex h-8 w-fit items-center gap-1 rounded-full bg-[var(--primary)] px-4 text-base text-[var(--on-primary)] 2xl:h-12 2xl:text-2xl"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-6 w-auto fill-[var(--on-primary)]" />
          <span>Back</span>
        </button>
      </div>
      <div className={`grid grid-cols-2 gap-4 sm:grid-cols-3`}>
        {distributeMedia(data, "media").map((column, index) => {
          return (
            <div key={index} className="flex flex-col pb-10">
              {column.map((card) => {
                if (card.type === "Video") {
                  const { id, video_files, video_pictures } = card;
                  const sortedVideos = video_files.sort(
                    (a, b) => a.width - b.width,
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
