import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { FaRegMoon } from "react-icons/fa6";
import { FiSun } from "react-icons/fi";

const ThemeBtn = () => {
  const { setDarkMode, darkMode } = useContext(AppContext);

  return (
    <div className="flex flex-row gap-5">
      <button className="text-[var(--on-background)] bg-[var(--surface)] hover:bg-[var(--surface-variant)] rounded-full transition-colors duration-100">
        {darkMode && (
          <FiSun
            onClick={() => {
              setDarkMode(!darkMode);
              localStorage.setItem(
                "isDark",
                JSON.stringify(!JSON.parse(localStorage.getItem("isDark")))
              );
            }}
            className="h-10 2xl:h-12 w-auto p-2"
          />
        )}
        {!darkMode && (
          <FaRegMoon
            onClick={() => {
              setDarkMode(!darkMode);
              localStorage.setItem(
                "isDark",
                JSON.stringify(!JSON.parse(localStorage.getItem("isDark")))
              );
            }}
            className="h-10 2xl:h-12 w-auto p-2"
          />
        )}
      </button>
    </div>
  );
};

export default ThemeBtn;
