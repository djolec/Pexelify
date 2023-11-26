import React from "react";
import "../style.css";
import { LiaHomeSolid, LiaVideoSolid, LiaHeart } from "react-icons/lia";
import { BsJournalAlbum } from "react-icons/bs";
import { MdOutlineInsertPhoto } from "react-icons/md";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import { motion } from "framer-motion";

const NavBar = () => {
  const { pageSelected, setPageSelected, isMobileView, setMobMenuOpen } =
    useContext(AppContext);

  return (
    <div className="bg-inherit -translate-x-4 text-xl md:text-lg">
      <ul className="flex flex-col text-[var(--on-background)]">
        <motion.li
          {...(isMobileView
            ? {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.2, delay: 0.2 },
              }
            : {})}
          className="relative"
        >
          <Link to={"/"}>
            <button
              onClick={() => {
                setPageSelected("Homepage");
                if (isMobileView) {
                  setMobMenuOpen(false);
                }
              }}
              className={`flex flex-row items-center gap-3 ${
                pageSelected === "Homepage"
                  ? "bg-[var(--secondary-container)]"
                  : null
              }  after:absolute after:inset-0 after:hover:bg-gray-600/10 after:rounded-full  after:transition-colors after:duration-100 px-4 rounded-full py-3 w-[220px]`}
            >
              <LiaHomeSolid className="h-6 w-auto" />
              <span className="">Home</span>
            </button>
          </Link>
        </motion.li>
        <motion.li
          {...(isMobileView
            ? {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.2, delay: 0.2 },
              }
            : {})}
          className="relative"
        >
          <Link to={`/media/photos/curated`}>
            <button
              onClick={() => {
                setPageSelected("Photos");
                if (isMobileView) {
                  setMobMenuOpen(false);
                }
              }}
              className={`flex flex-row items-center gap-3 ${
                pageSelected === "Photos"
                  ? "bg-[var(--secondary-container)]"
                  : null
              } after:absolute after:inset-0 after:hover:bg-gray-600/10 after:rounded-full   after:transition-colors after:duration-100 px-4 rounded-full py-3 w-[220px]`}
            >
              <MdOutlineInsertPhoto className="h-6 w-auto" />
              <span className="">Photos</span>
            </button>
          </Link>
        </motion.li>
        <motion.li
          {...(isMobileView
            ? {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.2, delay: 0.2 },
              }
            : {})}
          className="relative"
        >
          <Link to={`/media/videos/popular`}>
            <button
              onClick={() => {
                setPageSelected("Videos");
                if (isMobileView) {
                  setMobMenuOpen(false);
                }
              }}
              className={`flex flex-row items-center gap-3 ${
                pageSelected === "Videos"
                  ? "bg-[var(--secondary-container)]"
                  : null
              } after:absolute after:inset-0 after:hover:bg-gray-600/10 after:rounded-full after:transition-colors after:duration-100 px-4 rounded-full py-3 w-[220px]`}
            >
              <LiaVideoSolid className="h-6 w-auto" />
              <span className="">Videos</span>
            </button>
          </Link>
        </motion.li>
        <motion.li
          {...(isMobileView
            ? {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.2, delay: 0.2 },
              }
            : {})}
          className="relative"
        >
          <Link to={`/media/collections/featured`}>
            <button
              onClick={() => {
                setPageSelected("Collections");
                if (isMobileView) {
                  setMobMenuOpen(false);
                }
              }}
              className={`flex flex-row items-center gap-3 ${
                pageSelected === "Collections"
                  ? "bg-[var(--secondary-container)]"
                  : null
              } after:absolute after:inset-0 after:hover:bg-gray-600/10 after:rounded-full   after:transition-colors after:duration-100 px-4 rounded-full py-3 w-[220px]`}
            >
              <BsJournalAlbum className="h-6 w-auto" />
              <span className="">Collections</span>
            </button>
          </Link>
        </motion.li>
        <motion.li
          {...(isMobileView
            ? {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                transition: { duration: 0.2, delay: 0.2 },
              }
            : {})}
          className="relative"
        >
          <Link to={`/media/favorites`}>
            <button
              onClick={() => {
                setPageSelected("Favorites");
                if (isMobileView) {
                  setMobMenuOpen(false);
                }
              }}
              className={`flex flex-row items-center gap-3 ${
                pageSelected === "Favorites"
                  ? "bg-[var(--secondary-container)]"
                  : null
              } after:absolute after:inset-0 after:hover:bg-gray-600/10 after:rounded-full   after:transition-colors after:duration-100 px-4 rounded-full py-3 w-[220px]`}
            >
              <LiaHeart className="h-6 w-auto" />
              <span className="">Favorite</span>
            </button>
          </Link>
        </motion.li>
      </ul>
    </div>
  );
};

export default NavBar;
