import React from "react";
import { useFetchFeaturedPhotos } from "../Hooks/useFetchData";
import { useContext } from "react";
import { AppContext } from "../App";
import PhotoCard from "./PhotoCard";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import "../style.css";

const FeaturedPhotos = () => {
  const fetchParam = "page=1&per_page=27";
  const { data, isFetching, isError, error } =
    useFetchFeaturedPhotos(fetchParam);

  const { setPageSelected, bigScreen } = useContext(AppContext);

  return (
    <section
      className={`relative flex w-full flex-grow flex-row overflow-hidden ${
        isFetching || isError ? "h-[600px]" : "h-[450vw] md:h-[140vw]"
      } items-start justify-center`}
    >
      {data?.data && (
        <div className="hsl-basic pointer-events-none absolute bottom-0 left-1/2 z-[5] h-36 w-full -translate-x-1/2 md:w-[70%]">
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
      <div className="custom-div relative flex w-full flex-col justify-start gap-2 md:w-[70%] ">
        <h1 className="mb-4 text-left text-2xl text-[var(--on-background)] 2xl:text-5xl">
          Featured photos
        </h1>
        <div className="relative columns-2 md:columns-3">
          {data?.data && !isFetching
            ? data.data.photos.map((card) => {
                return (
                  <div key={card.id} className="mb-4">
                    <PhotoCard
                      bgColor={card.avg_color}
                      source={card.src.medium}
                      photoWidth={card.width}
                      photoHeight={card.height}
                      photoID={card.id}
                    />
                  </div>
                );
              })
            : null}
          {isFetching && (
            <PulseLoader
              className="absolute left-1/2 top-20 -translate-x-1/2 pb-20"
              size={`${bigScreen ? 45 : 25}`}
              color="var(--on-background)"
            />
          )}
          {isError && (
            <h1 className="w-full whitespace-nowrap text-left text-2xl text-[var(--on-background)]">
              {error.message}
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPhotos;
