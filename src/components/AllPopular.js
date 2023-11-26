import React from "react";
import { useEffect, useContext, useLayoutEffect } from "react";
import { AppContext } from "../App";
import VideoCard from "./VideoCard";
import { PulseLoader } from "react-spinners";
import { useFetchAllPopular } from "../Hooks/useFetchData";

const AllPopular = () => {
  const { setPageSelected, setPhotosOrVideos } = useContext(AppContext);

  const {
    data,
    error,
    isError,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useFetchAllPopular();

  useLayoutEffect(() => {
    setPageSelected("Videos");
    setPhotosOrVideos("Videos");
    refetch();
  }, []);

  console.log(data);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight - 50;

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

  const screenWidth = window.innerWidth;
  const numberOfColumns = screenWidth < 768 ? 2 : 3;

  const finalColumns = Array.from({ length: numberOfColumns }, () => []);
  let finalColumnHeights = Array(numberOfColumns).fill(0);

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
      const columns = Array.from({ length: numberOfColumns }, () => []);
      const columnHeights = Array(numberOfColumns).fill(0);
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
        <div key={index} className="flex flex-col gap-4 pb-10">
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
                  videoImg={card.image}
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
      <div className="md:w-[70%] w-full">
        <h1 className="mx-auto w-full text-left text-2xl mb-4 text-[var(--on-background)]">
          Popular videos
        </h1>
        <div
          className={`grid ${
            numberOfColumns === 2 ? "grid-cols-2" : "grid-cols-3"
          } gap-4`}
        >
          {processPages()}
        </div>
        {isFetching && (
          <PulseLoader
            className="pb-20"
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

export default AllPopular;
