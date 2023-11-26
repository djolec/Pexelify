import React from "react";
import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { useParams } from "react-router-dom";
import { useFetchCollectionById } from "../Hooks/useFetchData";
import { PulseLoader } from "react-spinners";
import PhotoCard from "./PhotoCard";
import VideoCard from "./VideoCard";

const CollectionDetails = () => {
  const { setPageSelected, currentCollTitle } = useContext(AppContext);
  const { id } = useParams();

  const { data, refetch, fetchNextPage, isFetching, isError, error } =
    useFetchCollectionById(id);

  useEffect(() => {
    setPageSelected("Collections");
    refetch();
  }, []);
  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >=
      document.documentElement.scrollHeight;

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

  const calculateFn = (mediaData, columnHeights, columns) => {
    mediaData.forEach((mediaObj) => {
      const smallestColumnIndex = columnHeights.indexOf(
        Math.min(...columnHeights)
      );
      columns[smallestColumnIndex].push(mediaObj);
      columnHeights[smallestColumnIndex] += mediaObj.height / mediaObj.width;
    });
  };

  const processPages = () => {
    data?.pages.forEach((group) => {
      const columns = Array.from({ length: numberOfColumns }, () => []);
      const columnHeights = Array(numberOfColumns).fill(0);
      calculateFn(group.data.media, columnHeights, columns);
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
        <div key={index} className="flex flex-col gap-4 pb-20">
          {column.map((card) => {
            if (card.type === "Video") {
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
            } else {
              return (
                <PhotoCard
                  key={card.id}
                  bgColor={card.avg_color}
                  source={card.src.medium}
                  photoWidth={card.width}
                  photoHeight={card.height}
                  photoID={card.id}
                />
              );
            }
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
        <h1 className="w-full text-left text-2xl mb-4 text-[var(--on-background)]">
          {currentCollTitle}
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

export default CollectionDetails;
