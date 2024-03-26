import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { motion } from "framer-motion";

const Footer = () => {
  const { darkMode, isMobileView, pageSelected } = useContext(AppContext);

  const logoSource = darkMode
    ? require("../assets/LogoDark.png")
    : require("../assets/LogoLight.png");

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.2 } }}
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
    </motion.footer>
  );
};

export default Footer;
