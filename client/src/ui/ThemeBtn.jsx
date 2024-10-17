import { useContext } from "react";
import { AppContext } from "../App";
import Sun from "../assets/svg/sun.svg?react";
import Moon from "../assets/svg/moon.svg?react";

const ThemeBtn = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);

  return (
    <button
      aria-label="change theme"
      className="rounded-full bg-[var(--surface)] text-[var(--on-background)] transition-colors duration-100 hover:bg-[var(--surface-variant)] block"
    >
      {darkMode && (
        <Sun
          onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem(
              "isDark",
              JSON.stringify(!JSON.parse(localStorage.getItem("isDark")))
            );
          }}
          className="h-10 w-auto p-2 2xl:h-[70px] 2xl:p-3"
        />
      )}

      {!darkMode && (
        <Moon
          onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem(
              "isDark",
              JSON.stringify(!JSON.parse(localStorage.getItem("isDark")))
            );
          }}
          className="h-10 w-auto p-2 2xl:h-[70px] 2xl:p-3"
        />
      )}
    </button>
  );
};

export default ThemeBtn;
