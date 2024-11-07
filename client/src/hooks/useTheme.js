import { useEffect, useState } from "react";

const useTheme = () => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDark")) || null,
  );

  // Handles dark/light theme upon load
  useEffect(() => {
    if (localStorage.getItem("isDark")) {
      setDarkMode(JSON.parse(localStorage.getItem("isDark")));
    } else {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );
      setDarkMode(darkModeMediaQuery.matches);
      localStorage.setItem(
        "isDark",
        JSON.stringify(darkModeMediaQuery.matches),
      );

      const handleDarkModeChange = (e) => {
        setDarkMode(e.matches);
      };

      darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

      return () => {
        darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
      };
    }
  }, []);

  return { darkMode, setDarkMode };
};

export default useTheme;
