import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

const Footer = () => {
  const { darkMode, isMobileView, pageSelected } = useContext(AppContext);

  const logoSource = darkMode
    ? require("../assets/LogoDark.png")
    : require("../assets/LogoLight.png");

  return (
    <footer
      className={`py-6 2xl:py-10 ${
        !isMobileView && pageSelected === "Details"
          ? "absolute bottom-0 right-8"
          : null
      }`}
    >
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-2xl font-semibold text-[var(--on-background)] 2xl:text-5xl">
          Powered by
        </h1>
        <img
          className={`h-16 w-auto ${
            isMobileView ? null : "translate-y-[3px]"
          }  2xl:h-28`}
          src={logoSource}
          alt="Pexels logo"
        />
      </div>
    </footer>
  );
};

export default Footer;
