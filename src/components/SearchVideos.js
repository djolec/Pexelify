import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSearchVideos } from "../hooks/useFetchData";
import { distributeMedia } from "../utils/columnUtils";
import { handleScroll } from "../utils/handleScroll";
import { useNumberOfColumns } from "../hooks/useNumberOfColumns";
import VideoCard from "./VideoCard";
import Loader from "./Loader";
import Filter from "./Filter";
import { motion } from "framer-motion";

const SearchVideos = () => {
  const { id } = useParams();
  const [searchObj, setSearchObj] = useState(
    JSON.parse(localStorage.getItem("searchObj")) || {
      orientation: "",
      size: "",
    },
  );

  const { data, error, isError, fetchNextPage, isFetching, refetch } =
    useSearchVideos(id, searchObj);

  const { numberOfColumns } = useNumberOfColumns();

  useEffect(() => {
    window.scrollTo(0, 0);

    const scrollHandle = () => handleScroll(fetchNextPage);
    window.addEventListener("scroll", scrollHandle, {
      passive: true,
    });

    const handleBeforeUnload = () => {
      localStorage.removeItem("searchObj");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    if (!localStorage.getItem("searchObj")) {
      localStorage.setItem(
        "searchObj",
        JSON.stringify({
          orientation: "",
          size: "",
        }),
      );
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("scroll", scrollHandle);
    };
  }, []);

  useEffect(
    () => {
      localStorage.setItem("searchObj", JSON.stringify(searchObj));
      refetch();
    },
    [searchObj],
    [id],
  );

  const finalColumns = Array.from({ length: numberOfColumns }, () => []);
  let finalColumnHeights = Array(numberOfColumns).fill(0);

  const renderMedia = () => {
    return distributeMedia(
      data,
      finalColumns,
      finalColumnHeights,
      "videos",
      numberOfColumns,
    ).map((column, index) => {
      return (
        <div key={index} className="flex flex-col pb-10">
          {column.map((card) => {
            const { id, video_files, video_pictures } = card;
            const sortedVideos = video_files.sort((a, b) => a.width - b.width);
            const image = video_pictures[0].picture;
            const { width, height, link } = sortedVideos[0];
            return (
              <VideoCard
                key={id}
                numberOfColumns={numberOfColumns}
                source={link}
                cardWidth={width}
                cardHeight={height}
                videoID={id}
                videoImg={image}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <section className="flex w-full flex-grow flex-col gap-4 md:w-[70%]">
      <div>
        <h1 className="mb-2 w-full text-left text-2xl text-[var(--on-background)] 2xl:text-5xl">
          {id} videos
        </h1>
        <Filter searchObj={searchObj} setSearchObj={setSearchObj} />
      </div>
      <div className={`grid grid-cols-2 gap-4  sm:grid-cols-3`}>
        {renderMedia()}
      </div>
      {isFetching && <Loader />}
      {isError && (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
          className="mt-20 w-full whitespace-nowrap text-center text-2xl text-[var(--on-background)]"
        >
          {error.message}
        </motion.h1>
      )}
      {data?.pages[0].data.total_results === 0 && (
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.4, delay: 0.3 } }}
          className="mt-20 w-full text-center text-2xl text-[var(--on-background)]"
        >
          We couldn't find any matching videos. Consider changing the search
          keyword or filter.
        </motion.h1>
      )}
    </section>
  );
};

export default SearchVideos;
