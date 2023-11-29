import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";

const Footer = () => {
  const { darkMode } = useContext(AppContext);

  const logoSource = darkMode
    ? require("../assets/LogoDark.png")
    : require("../assets/LogoLight.png");

  return (
    <footer className="py-6 2xl:py-10">
      <div className="flex flex-row items-center justify-center">
        <h1 className="text-2xl 2xl:text-5xl font-semibold text-[var(--on-background)]">
          Powered by
        </h1>
        <img
          className="h-16 2xl:h-28 w-auto translate-y-[3px]"
          src={logoSource}
          alt="Pexels logo"
        />
      </div>
    </footer>
  );
};

export default Footer;
