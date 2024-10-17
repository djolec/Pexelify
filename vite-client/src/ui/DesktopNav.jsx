import desktopNavItems from "../constants/desktopNavItems";
import { Link, NavLink } from "react-router-dom";
import Logout from "../features/authentication/Logout";

const DesktopNav = () => {
  return (
    <nav
      role="navigation"
      aria-label="main navigation"
      className="h-screen bg-[var(--surface)] px-8 py-6 pr-0 2xl:py-8 hidden sm:flex flex-col justify-between min-w-[280px] 2xl:min-w-[20%]"
    >
      <div className="w-full">
        <Link to={"/homepage"} className="flex flex-row gap-1 2xl:gap-2">
          <h1 className="text-4xl font-semibold text-[var(--primary)] 2xl:text-6xl">
            Pexelify
          </h1>
          <img
            height="250"
            width="250"
            className="h-10 w-auto 2xl:h-[74px]"
            src="/assets/logos/PexelifyLogo.webp"
            alt=""
          />
        </Link>

        <ul className="mt-8 flex -translate-x-4 flex-col text-[var(--on-background)] w-full">
          {desktopNavItems.map((navItem) => {
            const { text, icon: IconComponent, link } = navItem;
            return (
              <li key={text} className="w-full">
                <NavLink
                  to={link}
                  className="relative flex w-full flex-row items-center gap-3 rounded-full px-4 py-3 after:absolute after:inset-0 after:rounded-full after:transition-colors after:duration-100 after:hover:bg-gray-600/10 2xl:py-4"
                >
                  <IconComponent className="h-6 w-auto fill-[var(--on-background)] 2xl:h-10" />
                  <span className="text-xl 2xl:text-4xl">{text}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>

      <Logout />
    </nav>
  );
};

export default DesktopNav;
