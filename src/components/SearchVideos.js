import React from "react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSearchVideos } from "../Hooks/useFetchData";
import { PulseLoader } from "react-spinners";
import VideoCard from "./VideoCard";
import Filter from "./Filter";
import { AppContext } from "../App";

const SearchVideos = () => {
  const { inputValue, searchObj, setPageSelected } = useContext(AppContext);
  const { id } = useParams();

  const {
    data,
    error,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useSearchVideos(id, searchObj);

  useEffect(() => {
    setPageSelected("Videos");
  }, []);

  useEffect(
    () => {
      refetch();
      if (!isLoading) {
        console.log(data);
      }
    },
    [searchObj],
    [id]
  );

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 500;

    if (bottom) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const finalColumns = [[], [], []];
  let finalColumnHeights = [0, 0, 0];

  const calculateFn = (videoData, columnHeights, columns) => {
    videoData.forEach((videoObj) => {
      const smallestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columns[smallestColumnIndex].push(videoObj);
      columnHeights[smallestColumnIndex] += videoObj.height / videoObj.width;
    });
  };

  const processPages = () => {
    data?.pages.forEach((group) => {
      const columns = [[], [], []];
      let columnHeights = [0, 0, 0];
      calculateFn(group.data.videos, columnHeights, columns);
      columns.forEach((column, index) => {
        const shortestFinalColumnIndex = finalColumnHeights.indexOf(
          Math.min(...finalColumnHeights)
        );
        const longestColumnIndex = columnHeights.indexOf(
          Math.max(...columnHeights)
        );
        finalColumns[shortestFinalColumnIndex].push(
          ...columns[longestColumnIndex]
        );
        finalColumnHeights[shortestFinalColumnIndex] +=
          columnHeights[longestColumnIndex];
        columnHeights[longestColumnIndex] = -1;
      });
    });
    const render = finalColumns.map((column, index) => {
      return (
        <div key={index} className="flex flex-col gap-4">
          {column.map((card) => {
            const sortedVideos = card.video_files.sort(
              (a, b) => a.width - b.width
            );
            return (
              <div key={card.id}>
                <VideoCard
                  bgImage={card.image}
                  source={sortedVideos[0].link}
                  cardWidth={
                    card.video_files[card.video_files.length - 1].width
                  }
                  cardHeight={
                    card.video_files[card.video_files.length - 1].height
                  }
                  videoID={card.id}
                />
              </div>
            );
          })}
        </div>
      );
    });
    return render;
  };

  return (
    <section
      className="flex-grow w-full flex flex-row
       justify-center items-start"
    >
      <div className="w-[70%] flex flex-col gap-8">
        <div>
          <h1 className="mx-auto w-full mb-2 text-left text-2xl text-[var(--on-background)]">
            {id} videos
          </h1>
          <Filter />
        </div>
        <div className="grid grid-cols-3 gap-4">{processPages()}</div>
        {isFetching && (
          <PulseLoader
            className="pb-20 self-center"
            size={25}
            color="var(--on-background)"
          />
        )}
        {isError && (
          <h1 className="w-full text-2xl text-left text-[var(--on-background)]">
            {error.message}
          </h1>
        )}
      </div>
    </section>
  );
};

export default SearchVideos;
