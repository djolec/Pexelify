import React from "react";
import { useLocation } from "react-router-dom";

const Footer = ({ darkMode }) => {
  const location = useLocation();

  return (
    <footer
      className={`flex flex-row items-center justify-center bg-[var(--background)] py-6 2xl:py-4  ${
        location.pathname.includes("details")
          ? "sm:absolute sm:bottom-4 sm:right-8 sm:py-0"
          : ""
      }`}
    >
      <h1 className="text-2xl font-semibold text-[var(--on-background)] 2xl:text-5xl">
        Powered by
      </h1>
      <img
        height="167"
        width="400"
        src={
          darkMode
            ? "/assets/images/logos/PexelsLogoDark.png"
            : "/assets/images/logos/PexelsLogoLight.png"
        }
        alt=""
        className="h-16 w-auto translate-y-[3px] 2xl:h-[120px] 2xl:translate-y-[6px]"
      />
    </footer>
  );
};

export default Footer;
