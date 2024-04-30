import React from "react";
import "../style.css";
import { useState, useEffect } from "react";
import { carouselData } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [num, setNum] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    let timeoutId;
    if (!isHovered) {
      timeoutId = setTimeout(() => {
        if (num === -200) {
          setNum(0);
        } else {
          setNum(num - 100);
        }
      }, 3500);
    }
    return () => clearTimeout(timeoutId);
  }, [num, isHovered]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    const touchDiff = touchEndX - touchStartX;
    if (touchDiff > 50 && num < 0) {
      // Swipe right
      setNum(num + 100);
    } else if (touchDiff < -50 && num > -200) {
      // Swipe left
      setNum(num - 100);
    }
  };

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full overflow-hidden rounded-2xl">
        <div
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="flex w-full flex-row transition-transform duration-500 ease-in-out"
          style={{ transform: `translate(${num}%, 0%)` }}
        >
          {carouselData.carousels.map((carousel, index) => {
            const { mainText, smallText, bgColor, textColor, link, assets } =
              carousel;

            return (
              <div
                key={index}
                className={`relative flex h-[360px] min-w-full snap-start flex-row items-end overflow-hidden bg-[var(${bgColor})] 2xl:h-[580px]`}
              >
                <div
                  className={`hsl-gradient${
                    index + 1
                  } z-[1] flex h-full w-full flex-col items-start justify-center gap-4 pl-8 2xl:pl-12`}
                >
                  <h2
                    className={`w-[16ch] text-left text-4xl text-[var(${textColor})] 2xl:text-7xl`}
                  >
                    {mainText}
                  </h2>

                  <p
                    className={`text-left text-sm text-[var(${textColor})] hidden md:block 2xl:text-2xl`}
                  >
                    {smallText}
                  </p>

                  <button
                    aria-label={carousel.type}
                    onClick={() => navigate(`${link}`)}
                    className={`w-fit rounded-full bg-[var(${textColor})] px-4 py-2 text-[var(--background)] 2xl:px-6 2xl:py-4 2xl:text-3xl`}
                  >
                    Explore now
                  </button>
                </div>

                <div className="grid-area-container absolute inset-0 left-[28%]">
                  {assets.map((asset, index) => {
                    return asset.type === "photo" ? (
                      <div
                        style={{
                          backgroundImage: `url(${asset.link})`,
                        }}
                        key={asset.link}
                        className={`b${index + 1} ${
                          carouselData.borders[index]
                        } bg-cover bg-center`}
                      />
                    ) : (
                      <div
                        key={asset.link}
                        className={`b${index + 1} overflow-hidden ${
                          carouselData.borders[index]
                        }`}
                      >
                        <video
                          className="h-full w-full object-cover"
                          width={asset.width}
                          height={asset.width}
                          muted
                          autoPlay={true}
                          loop={true}
                          loading="lazy"
                        >
                          <source src={asset.link} type="video/webm" />
                        </video>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {/* <PhotosCarousel /> */}
        </div>
      </div>

      <div className="mt-6 flex flex-row justify-center gap-4">
        {[...Array(3)].map((_, index) => {
          return (
            <div
              key={index}
              onClick={() => setNum(index * -100)}
              className={`h-3 w-3 cursor-pointer rounded-full ${
                num === index * -100
                  ? "bg-red-600"
                  : "bg-[var(--on-background)]"
              } transition-colors duration-300 sm:hover:bg-red-400`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Carousel;
