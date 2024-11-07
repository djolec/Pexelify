import { useLocation } from "react-router-dom";
import { AppContext } from "../App";
import { useContext } from "react";

const Footer = () => {
  const location = useLocation();
  const { darkMode } = useContext(AppContext);

  return (
    <footer
      className={`flex flex-row items-center justify-center bg-[var(--background)] py-8 2xl:py-4 ${
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
            ? "/assets/logos/PexelsLogoDark.png"
            : "/assets/logos//PexelsLogoLight.png"
        }
        alt=""
        className="h-16 w-auto translate-y-[3px] 2xl:h-[120px] 2xl:translate-y-[6px]"
      />
    </footer>
  );
};

export default Footer;
