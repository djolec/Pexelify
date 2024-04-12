import "./App.css";
import "./theme.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import AppComponents from "./components/AppComponents";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();
export const AppContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDark")) || null,
  );
  const [savedMedia, setSavedMedia] = useState(
    JSON.parse(localStorage.getItem("savedMedia")) || [],
  );

  useEffect(() => {
    if (!localStorage.getItem("savedMedia")) {
      localStorage.setItem("savedMedia", JSON.stringify([]));
    }
  }, []);

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

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          darkMode,
          setDarkMode,
          savedMedia,
          setSavedMedia,
        }}
      >
        <div
          data-theme={darkMode ? "dark" : "light"}
          className="App bg-[var(--background)] "
        >
          <Router>
            <AppComponents savedMedia={savedMedia} darkMode={darkMode} />
          </Router>
        </div>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
