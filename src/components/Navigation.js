import React from "react";
import NavBar from "./NavBar";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App";
import { motion } from "framer-motion";

const Navigation = () => {
  const { pageSelected, setPageSelected, mobMenuOpen, setMobMenuOpen } =
    useContext(AppContext);

  return (
    <motion.nav
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.2 }}
      className={`${
        pageSelected === "Details" ? "md:hidden" : "md:block"
      } fixed left-0 top-0 z-50 h-screen w-[280px] origin-left flex-col items-start justify-start gap-8 bg-[var(--surface)] pl-8 pt-5 md:flex 2xl:w-[400px]`}
    >
      <div className="mb-4 flex flex-row items-center gap-2 md:mb-0">
        <button
          onClick={() => setMobMenuOpen(false)}
          className="flex flex-row items-center gap-2 md:hidden"
        >
          <FaArrowLeftLong className="h-6 w-auto text-[var(--on-background)]" />
          <h1 className="text-3xl font-semibold text-[var(--primary)]">
            Pexelify
          </h1>
        </button>
        <Link to={"/"} className="hidden md:block">
          <button
            className="flex flex-row gap-1 2xl:gap-2"
            onClick={() => setPageSelected("Homepage")}
          >
            <h1 className="text-4xl font-semibold text-[var(--primary)] 2xl:text-6xl">
              Pexelify
            </h1>
            <img
              className="h-10 w-auto 2xl:h-[74px]"
              src={require("../assets/logo.png")}
              alt=""
            />
          </button>
        </Link>
      </div>
      <NavBar />
    </motion.nav>
  );
};

export default Navigation;
