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
  const { data, isLoading, isFetching, isError, error } =
    useFetchFeaturedPhotos(fetchParam);

  const { setPageSelected } = useContext(AppContext);

  return (
    <section
      className={`flex-grow w-full relative overflow-hidden flex flex-row ${
        isFetching || isError ? "h-[600px]" : "md:h-[140vw] h-[450vw]"
      } justify-center items-start`}
    >
      {data?.data && (
        <div className="md:w-[70%] w-full h-36 absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none hsl-basic z-[5]">
          <Link to={`/media/photos/curated`}>
            <button
              onClick={() => setPageSelected("Photos")}
              className="pointer-events-auto px-4 py-2 2xl:py-3 2xl:text-3xl bg-[var(--primary)] text-[var(--on-primary)] rounded-full w-fit absolute bottom-12 2xl:bottom-14 left-1/2 -translate-x-1/2 "
            >
              Explore more
            </button>
          </Link>
        </div>
      )}
      <div className="w-full md:w-[70%] flex flex-col custom-div gap-2 justify-start relative ">
        <h1 className="text-left text-2xl 2xl:text-5xl mb-4 text-[var(--on-background)]">
          Featured photos
        </h1>
        <div className="md:columns-3 columns-2 relative">
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
              className="pb-20 absolute top-20 left-1/2 -translate-x-1/2"
              size={25}
              color="var(--on-background)"
            />
          )}
          {isError && (
            <h1 className="w-full text-2xl text-left text-[var(--on-background)] whitespace-nowrap">
              {error.message}
            </h1>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPhotos;
