import { motion } from "framer-motion";
import LeftIcon from "../assets/svg/arrow-left.svg?react";
import desktopNavItems from "../constants/desktopNavItems";
import { NavLink } from "react-router-dom";
import { useRef } from "react";
import useClickOutside from "../hooks/useClickOutside";
import Logout from "../features/authentication/Logout";

const MobileNavMenu = ({ setMobMenuOpen }) => {
  const mobNavRef = useRef(null);
  useClickOutside(mobNavRef, setMobMenuOpen);

  return (
    <motion.nav
      ref={mobNavRef}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1, transition: { duration: 0.2 } }}
      role="navigation"
      aria-label="mobile navigation"
      className="fixed left-0 top-0 flex h-screen w-[280px] origin-left flex-col justify-between bg-[var(--surface)] px-8 py-6 pr-0"
    >
      <div>
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
          {desktopNavItems.map((navItem) => {
            const { text, icon: IconComponent, link } = navItem;
            return (
              <li key={text}>
                <NavLink
                  to={link}
                  className="relative flex w-full flex-row items-center gap-3 rounded-full px-4 py-3 after:absolute after:inset-0 after:rounded-full after:transition-colors after:duration-100 after:hover:bg-gray-600/10 2xl:w-[340px] 2xl:py-4"
                >
                  <IconComponent className="h-7 w-auto fill-[var(--on-background)] 2xl:h-10" />
                  <span className="text-2xl">{text}</span>
                </NavLink>
              </li>
            );
          })}
        </motion.ul>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 0.3, delay: 0.2 } }}
        className=""
      >
        <Logout />
      </motion.div>
    </motion.nav>
  );
};

export default MobileNavMenu;
