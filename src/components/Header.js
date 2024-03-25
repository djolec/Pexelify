import React from "react";
import { IoMenu } from "react-icons/io5";
import SearchBar from "./SearchBar";
import ThemeBtn from "./ThemeBtn";
import BackBtn from "./BackBtn";
import { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import MobileSearchBar from "../components/MobileSearchBar";

const Header = () => {
  const {
    pageSelected,
    mobMenuOpen,
    setMobMenuOpen,
    mobSearchBar,
    setMobSearchBar,
    isMobileView,
  } = useContext(AppContext);

  return (
    <header
      className={`z-30 h-20 2xl:h-28 ${
        isMobileView ? "fixed top-0 z-40" : null
      } flex w-full flex-row items-center justify-between bg-inherit px-4 md:px-8 ${
        pageSelected === "Details" ? "hidden" : "block"
      }`}
    >
      <div className="flex flex-row items-center gap-2">
        <button
          onClick={() => setMobMenuOpen(!mobMenuOpen)}
          className="text-[var(--on-background)] md:hidden"
        >
          <IoMenu className="h-8 w-auto" />
        </button>
        <div className="flex flex-row gap-1 md:hidden">
          <Link to={"/"} className="flex flex-row gap-1">
            <h1 className="hidden text-3xl font-semibold text-[var(--primary)] sm:block">
              Pexelify
            </h1>
            <img
              className=" h-10 w-auto"
              src={require("../assets/logo.png")}
              alt=""
            />
          </Link>
        </div>
      </div>

      <BackBtn />

      <SearchBar />
      {mobSearchBar && <MobileSearchBar />}

      <div className="flex flex-row items-center gap-2">
        <button
          onClick={() => setMobSearchBar(!mobSearchBar)}
          className="rounded-full bg-[var(--surface)] text-[var(--on-background)] md:hidden"
        >
          <FaMagnifyingGlass className="h-10 w-10 p-3" />
        </button>
        <ThemeBtn />
      </div>
    </header>
  );
};

export default Header;
