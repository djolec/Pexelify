import React from "react";
import { useRef, useEffect } from "react";
import { desktopNavItems } from "../utils/constants";
import { useLocation, Link } from "react-router-dom";
import { ReactComponent as LeftIcon } from "../svg/arrow-left.svg";
import { motion } from "framer-motion";

const MobileNav = ({ setMobMenuOpen }) => {
  const location = useLocation();
  const mobNavRef = useRef(null);

  useEffect(() => {
    const closeMobNav = (e) => {
      if (mobNavRef.current && !mobNavRef.current.contains(e.target)) {
        setMobMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMobNav);

    return () => document.removeEventListener("mousedown", closeMobNav);
  }, []);

  return (
    <motion.nav
      ref={mobNavRef}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1, transition: { duration: 0.2 } }}
      role="navigation"
      aria-label="Mobile"
      className="fixed left-0 top-0 h-screen w-[280px] origin-left bg-[var(--surface)] px-8 pt-6"
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.2 } }}
        onClick={() => setMobMenuOpen(false)}
        className="flex flex-row items-center justify-start gap-2"
      >
        <LeftIcon className="h-8 w-auto fill-[var(--on-background)]" />
        <span className="text-4xl font-semibold text-[var(--primary)]">
          Pexelify
        </span>
      </motion.button>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.2 } }}
        className="mt-6 flex -translate-x-4 flex-col text-[var(--on-background)]"
      >
        {desktopNavItems.map((navItem, index) => {
          const { text, icon: IconComponent, link } = navItem;
          return (
            <li key={index}>
              <Link
                onClick={() => setMobMenuOpen(false)}
                to={link}
                className={`relative flex w-[220px] flex-row items-center gap-3 rounded-full px-4  py-3 ${
                  location.pathname === link
                    ? "bg-[var(--secondary-container)]"
                    : ""
                } after:absolute after:inset-0 after:rounded-full after:transition-colors after:duration-100 after:hover:bg-gray-600/10`}
                href=""
              >
                <IconComponent className="h-7 w-auto fill-[var(--on-background)] 2xl:h-9" />
                <span className="text-xl">{text}</span>
              </Link>
            </li>
          );
        })}
      </motion.ul>
    </motion.nav>
  );
};

export default MobileNav;
