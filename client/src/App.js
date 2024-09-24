import "./App.css";
import "./theme.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect, createContext } from "react";
import AppComponents from "./components/AppComponents";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import CuratedPhotos from "./components/CuratedPhotos";
import PopularVideos from "./components/PopularVideos";
import FeaturedCollections from "./components/FeaturedCollections";
import PhotoDetails from "./components/PhotoDetails";
import VideoDetails from "./components/VideoDetails";
import CollectionDetails from "./components/CollectionDetails";
import SearchPhotos from "./components/SearchPhotos";
import SearchVideos from "./components/SearchVideos";
import Favorites from "./components/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/NotFound";
import Home from "./components/Home";
import Register from "./components/Register";
import { Toaster } from "react-hot-toast";

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
            <Routes>
              <Route path="/" element={<Home />} />
              <Route index path="login" element={<Login />} />
              <Route index path="register" element={<Register />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppComponents darkMode={darkMode} />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Homepage />} />
                <Route path="photos/curated" element={<CuratedPhotos />} />
                <Route path="videos/popular" element={<PopularVideos />} />
                <Route
                  path="collections/featured"
                  element={<FeaturedCollections />}
                />
                <Route path="photos/details/:id" element={<PhotoDetails />} />
                <Route path="videos/details/:id" element={<VideoDetails />} />
                <Route
                  path="collections/:id/:name"
                  element={<CollectionDetails />}
                />
                <Route path="photos/:id" element={<SearchPhotos />} />
                <Route path="videos/:id" element={<SearchVideos />} />
                <Route
                  path="favorites"
                  element={<Favorites savedMedia={savedMedia} />}
                />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>

          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: {
                duration: 3000,
              },
              error: {
                duration: 5000,
              },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--surface-container-high)",
                color: "var(--on-background)",
              },
            }}
          />
        </div>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
