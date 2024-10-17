import { useNavigate } from "react-router-dom";
import useHomepageVideos from "../../features/videos/useHomepageVideos";

import VideoCard from "../../ui/VideoCard";
import Loader from "../../ui/Loader";

import { useContext } from "react";
import { AppContext } from "../../App";

const HomepageVideos = () => {
  const navigate = useNavigate();

  const isMobile = useContext(AppContext);

  const { data, isError, error, isLoading } = useHomepageVideos();

  return (
    <section className="relative w-full overflow-hidden md:w-[70%] mx-auto mt-16">
      {data?.data && (
        <div className="hsl-basic pointer-events-none absolute bottom-0 left-1/2 z-[15] h-36 w-full -translate-x-1/2">
          <button
            onClick={() => navigate("/videos/popular")}
            className="pointer-events-auto absolute bottom-12 left-1/2 w-fit -translate-x-1/2 rounded-full bg-[var(--secondary)] px-4 py-2 text-[var(--on-secondary)] 2xl:bottom-14 2xl:px-6 2xl:py-4 2xl:text-3xl"
          >
            Explore more
          </button>
        </div>
      )}
      <div className={`${isError ? "h-[100vh]" : "h-[200vh]"} relative w-full`}>
        <h1 className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:mb-8 2xl:text-5xl">
          Popular videos
        </h1>
        <div className="columns-2 sm:columns-3 2xl:gap-6">
          {data?.data.videos.map((card) => {
            const { id, video_files, video_pictures } = card;
            const sortedVideos = video_files.sort((a, b) => a.width - b.width);
            const image = video_pictures[0].picture;
            const { width, height, link } = sortedVideos[0];
            return (
              <VideoCard
                key={id}
                source={link}
                cardWidth={width}
                cardHeight={height}
                videoID={id}
                videoImg={image}
                isMobile={isMobile}
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

export default HomepageVideos;
