import React from "react";
import { useState, useEffect } from "react";
import { ReactComponent as MenuIcon } from "../svg/menu.svg";
import { ReactComponent as SearchIcon } from "../svg/search.svg";
import { useNumberOfColumns } from "../hooks/useNumberOfColumns";
import ThemeBtn from "./ThemeBtn";
import SearchBar from "./SearchBar";
import MobileSearchBar from "./MobileSearchBar";
import MobileNav from "./MobileNav";
import Overlay from "./Overlay";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [mobSearchOpen, setMobSearchOpen] = useState(false);
  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const updateMobSearchOpen = (value) => {
    setMobSearchOpen(value);
  };
  const updateMobMenuOpen = (value) => {
    setMobMenuOpen(false);
  };
  const { isMobile } = useNumberOfColumns(
    updateMobSearchOpen,
    updateMobMenuOpen,
  );

  useEffect(() => {
    if (mobMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobMenuOpen]);

  return (
    <header
      className={`fixed top-0  z-40 flex h-20 w-full flex-row items-center justify-between bg-[var(--background)] px-4 md:relative md:px-8 2xl:h-28 ${
        location.pathname.includes("details") ? "hidden" : ""
      }`}
    >
      <div className="flex flex-row items-center gap-2 md:hidden">
        <button
          onClick={() => setMobMenuOpen(true)}
          aria-label="menu"
          className="text-[var(--on-background)]"
        >
          <MenuIcon className="h-8 w-auto" />
        </button>
        <button aria-label="navigate to home" onClick={() => navigate("/")}>
          <img
            height="250"
            width="250"
            className="h-10 w-auto"
            src={"/assets/images/logos/PexelifyLogo.webp"}
            alt=""
          />
        </button>
      </div>

      <SearchBar />

      <div className="flex flex-row items-center justify-center gap-3">
        {isMobile && (
          <button
            aria-label="open mobile search bar"
            onClick={() => setMobSearchOpen((prev) => !prev)}
            className="rounded-full bg-[var(--surface)] text-[var(--on-background)] transition-colors duration-100 hover:bg-[var(--surface-variant)]"
          >
            <SearchIcon className="h-10 w-auto p-[10px] 2xl:h-12" />
          </button>
        )}
        <ThemeBtn />
      </div>

      {mobSearchOpen && isMobile && (
        <MobileSearchBar setMobSearchOpen={setMobSearchOpen} />
      )}
      {mobMenuOpen && <Overlay setMobMenuOpen={setMobMenuOpen} />}
      {mobMenuOpen && <MobileNav setMobMenuOpen={setMobMenuOpen} />}
    </header>
  );
};

export default Header;
