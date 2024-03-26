import React from "react";
import { useFetchFeaturedPhotos } from "../Hooks/useFetchData";
import { useContext, useEffect, useLayoutEffect } from "react";
import { AppContext } from "../App";
import PhotoCard from "./PhotoCard";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import "../style.css";
import { motion } from "framer-motion";

const FeaturedPhotos = () => {
  const fetchParam = "page=1&per_page=27";
  const { data, isError, error, refetch, isLoading } =
    useFetchFeaturedPhotos(fetchParam);

  const { setPageSelected, bigScreen } = useContext(AppContext);

  useLayoutEffect(() => {
    refetch();
  }, []);

  return (
    <section className="relative h-[200vh] w-full flex-grow overflow-hidden">
      {data?.data && (
        <div className="hsl-basic pointer-events-none absolute bottom-0 left-1/2 z-[15] h-36 w-full -translate-x-1/2 md:w-[70%]">
          <Link to={`/media/photos/curated`}>
            <button
              onClick={() => setPageSelected("Photos")}
              className="pointer-events-auto absolute bottom-12 left-1/2 w-fit -translate-x-1/2 rounded-full bg-[var(--primary)] px-4 py-2 text-[var(--on-primary)] 2xl:bottom-14 2xl:px-6 2xl:py-4 2xl:text-3xl "
            >
              Explore more
            </button>
          </Link>
        </div>
      )}
      <div className="mx-auto h-[200vh] w-full md:w-[70%]">
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: 0.3, delay: 0.1 }}
          className="mb-4 w-full text-left text-2xl text-[var(--on-background)] 2xl:text-5xl"
        >
          Featured photos
        </motion.h1>
        <div className="columns-2 md:columns-3">
          {data?.data.photos.map((card) => {
            const {
              id,
              avg_color,
              width,
              height,
              src: { medium },
            } = card;

            return (
              <div key={id} className="mb-4">
                <PhotoCard
                  bgColor={avg_color}
                  source={medium}
                  photoWidth={width}
                  photoHeight={height}
                  photoID={id}
                />
              </div>
            );
          })}
        </div>
        {isLoading && (
          <PulseLoader
            className="absolute left-1/2 top-20 -translate-x-1/2 pb-20"
            size={`${bigScreen ? "45px" : "25px"}`}
            color="var(--on-background)"
          />
        )}
        {isError && (
          <h1 className="w-full whitespace-nowrap text-left text-2xl text-[var(--on-background)]">
            {error.message}
          </h1>
        )}
      </div>
    </section>
  );
};

export default FeaturedPhotos;
