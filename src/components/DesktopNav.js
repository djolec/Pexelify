import React from "react";
import { desktopNavItems } from "../utils/constants";
import { useLocation, Link } from "react-router-dom";

const DesktopNav = () => {
  const location = useLocation();

  return (
    <nav
      role="navigation"
      aria-label="Main"
      className={`fixed left-0 top-0 hidden h-screen w-[280px] bg-[var(--surface)] pl-8 pt-5 2xl:w-[400px] ${
        location.pathname.includes("details") ? "" : "md:block"
      }`}
    >
      <Link to={"/"} className="flex flex-row gap-1 2xl:gap-2">
        <h1 className="text-4xl font-semibold text-[var(--primary)] 2xl:text-6xl">
          Pexelify
        </h1>
        <img
          height="250"
          width="250"
          className="h-10 w-auto 2xl:h-[74px]"
          src="/assets/images/logos/PexelifyLogo.webp"
          alt=""
        />
      </Link>

      <ul className="mt-8 flex -translate-x-4 flex-col text-[var(--on-background)]">
        {desktopNavItems.map((navItem, index) => {
          const { text, icon: IconComponent, link } = navItem;
          return (
            <li key={index}>
              <Link
                to={link}
                className={`relative flex w-[220px] flex-row items-center gap-3 rounded-full px-4 py-3 2xl:w-[340px]  2xl:py-4 ${
                  location.pathname === link
                    ? "bg-[var(--secondary-container)]"
                    : ""
                } after:absolute after:inset-0 after:rounded-full after:transition-colors after:duration-100 after:hover:bg-gray-600/10`}
                href=""
              >
                <IconComponent className="h-6 w-auto fill-[var(--on-background)] 2xl:h-10" />
                <span className="text-xl md:text-lg 2xl:text-4xl">{text}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default DesktopNav;
