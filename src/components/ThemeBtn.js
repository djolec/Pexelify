import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { ReactComponent as Sun } from "../svg/sun.svg";
import { ReactComponent as Moon } from "../svg/moon.svg";

const ThemeBtn = () => {
  const { darkMode, setDarkMode } = useContext(AppContext);

  return (
    <button
      aria-label="change theme"
      className="rounded-full bg-[var(--surface)] text-[var(--on-background)] transition-colors duration-100 hover:bg-[var(--surface-variant)]"
    >
      {darkMode && (
        <Sun
          onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem(
              "isDark",
              JSON.stringify(!JSON.parse(localStorage.getItem("isDark"))),
            );
          }}
          className="h-10 w-auto p-2 2xl:h-12"
        />
      )}
      {!darkMode && (
        <Moon
          onClick={() => {
            setDarkMode(!darkMode);
            localStorage.setItem(
              "isDark",
              JSON.stringify(!JSON.parse(localStorage.getItem("isDark"))),
            );
          }}
          className="h-10 w-auto p-2 2xl:h-12"
        />
      )}
    </button>
  );
};

export default ThemeBtn;
