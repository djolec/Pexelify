import "./App.css";
import "./theme.css";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createContext } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import PersistLogin from "./features/authentication/PersistLogin";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Homepage from "./pages/Homepage/Homepage";
import CuratedPhotosPage from "./pages/CuratedPhotos/CuratedPhotosPage";
import PopularVideosPage from "./pages/PopularVideos/PopularVideosPage";
import FeaturedCollectionsPage from "./pages/FeaturedCollections/FeaturedCollectionsPage";
import FavoritesPage from "./pages/Favorites/FavoritesPage";
import PhotoDetails from "./pages/PhotoDetails/PhotoDetails";
import VideoDetails from "./pages/VideoDetails/VideoDetails";
import CollectionDetails from "./pages/CollectionDetails/CollectionDetails";
import SearchPhotos from "./pages/SearchPhotos/SearchPhotos";
import SearchVideos from "./pages/SearchVideos/SearchVideos";
import useIsMobile from "./hooks/useIsMobile";

import useTheme from "./hooks/useTheme";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();
export const AppContext = createContext();

function App() {
  const { darkMode, setDarkMode } = useTheme();
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ darkMode, setDarkMode, isMobile }}>
        <div data-theme={darkMode ? "dark" : "light"}>
          <BrowserRouter>
            <Routes>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />

              <Route element={<PersistLogin />}>
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="homepage" />} />
                  <Route path="homepage" element={<Homepage />} />
                  <Route
                    path="photos/curated"
                    element={<CuratedPhotosPage />}
                  />
                  <Route
                    path="videos/popular"
                    element={<PopularVideosPage />}
                  />
                  <Route
                    path="collections/featured"
                    element={<FeaturedCollectionsPage />}
                  />
                  <Route path="photos/:id" element={<SearchPhotos />} />
                  <Route path="videos/:id" element={<SearchVideos />} />

                  <Route path="photos/details/:id" element={<PhotoDetails />} />
                  <Route path="videos/details/:id" element={<VideoDetails />} />
                  <Route
                    path="collections/:id/:name"
                    element={<CollectionDetails />}
                  />
                  <Route path="favorites" element={<FavoritesPage />} />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>

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
                maxWidth: "400px",
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
