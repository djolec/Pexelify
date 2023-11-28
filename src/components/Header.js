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
      className={`h-20 z-30 ${
        isMobileView ? "fixed top-0 z-40" : null
      } flex flex-row bg-inherit items-center px-4 md:px-8 justify-between w-full ${
        pageSelected === "Details" ? "hidden" : "block"
      }`}
    >
      <div className="flex flex-row items-center gap-2">
        <button
          onClick={() => setMobMenuOpen(!mobMenuOpen)}
          className="md:hidden text-[var(--on-background)]"
        >
          <IoMenu className="h-8 w-auto" />
        </button>
        <div className="flex flex-row gap-1 md:hidden">
          <h1 className="text-3xl text-[var(--primary)]">
            <Link to={"/"}>Pexelify</Link>
          </h1>
          <img
            className="h-10 w-auto"
            src={require("../assets/logo.png")}
            alt=""
          />
        </div>
      </div>

      <BackBtn />

      <SearchBar />
      {mobSearchBar && <MobileSearchBar />}

      <div className="flex flex-row items-center gap-2">
        <button
          onClick={() => setMobSearchBar(!mobSearchBar)}
          className="text-[var(--on-background)] rounded-full bg-[var(--surface)] md:hidden"
        >
          <FaMagnifyingGlass className="h-10 w-10 p-3" />
        </button>
        <ThemeBtn />
      </div>
    </header>
  );
};

export default Header;
