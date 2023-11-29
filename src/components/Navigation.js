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
      } md:flex flex-col z-50 gap-8 justify-start origin-left pl-8 items-start pt-5 w-[280px] 2xl:w-[400px] bg-[var(--surface)] h-screen fixed top-0 left-0`}
    >
      <div className="flex flex-row gap-2 items-center mb-4 md:mb-0">
        <button
          onClick={() => setMobMenuOpen(false)}
          className="md:hidden flex flex-row items-center gap-2"
        >
          <FaArrowLeftLong className="h-6 w-auto text-[var(--on-background)]" />
          <h1 className="text-[var(--primary)] text-[28px] font-semibold">
            Pexelify
          </h1>
        </button>
        <Link to={"/"} className="hidden md:block">
          <button
            className="flex flex-row gap-1 2xl:gap-2"
            onClick={() => setPageSelected("Homepage")}
          >
            <h1 className="text-[var(--primary)] text-4xl 2xl:text-6xl font-semibold">
              Pexelify
            </h1>
            <img
              className="h-10 2xl:h-[74px] w-auto"
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
