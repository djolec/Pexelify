import "./App.css";
import "./theme.css";
import {
  useState,
  useEffect,
  createContext,
  useRef,
  useLayoutEffect,
} from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import Photos from "./components/Photos";
import CuratedPhotos from "./components/CuratedPhotos";
import SearchPhotos from "./components/SearchPhotos";
import AllPopular from "./components/AllPopular";
import SearchVideos from "./components/SearchVideos";
import PhotoDetails from "./components/PhotoDetails";
import VideDetails from "./components/VideDetails";
import CollectionDetails from "./components/CollectionDetails";
import AllCollections from "./components/AllCollections";
import Navigation from "./components/Navigation";
import Favorites from "./components/Favorites";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

export const AppContext = createContext();

function App() {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDark")) || null
  );
  const [pageSelected, setPageSelected] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [photosOrVideos, setPhotosOrVideos] = useState("Photos");
  const [favoritePhotosOrVideos, setFavoritePhotosOrVideos] =
    useState("Photos");
  const [searchObj, setSearchObj] = useState({
    orientation: "",
    size: "",
    color: "",
  });
  const [currentCollTitle, setCurrentCollTitle] = useState("");
  const [savedMedia, setSavedMedia] = useState([]);

  const [mobMenuOpen, setMobMenuOpen] = useState(false);
  const [mobSearchBar, setMobSearchBar] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [numberOfColumns, setNumberOfColumns] = useState(null);

  const searchBarRef = useRef();

  useEffect(() => {
    // Check if the screen width is less than or equal to a mobile size (e.g., 768px)
    const handleResize = () => {
      // setIsMobileView(window.innerWidth <= 768);
      if (window.innerWidth <= 768) {
        setMobMenuOpen(false);
        setIsMobileView(true);
      } else {
        setMobMenuOpen(true);
        setIsMobileView(false);
      }
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!searchBarRef.current.contains(event.target)) setSearchBarOpen(false);
    });
  });

  useLayoutEffect(() => {
    if (localStorage.getItem("savedMedia")) {
      setSavedMedia(JSON.parse(localStorage.getItem("savedMedia")));
    } else {
      localStorage.setItem("savedMedia", JSON.stringify([]));
    }
  }, []);

  useLayoutEffect(() => {
    if (localStorage.getItem("isDark")) {
      setDarkMode(JSON.parse(localStorage.getItem("isDark")));
    } else {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)"
      );
      setDarkMode(darkModeMediaQuery.matches);
      localStorage.setItem(
        "isDark",
        JSON.stringify(darkModeMediaQuery.matches)
      );

      const handleDarkModeChange = (e) => {
        setDarkMode(e.matches);
      };

      // Add event listener to track theme change
      darkModeMediaQuery.addEventListener("change", handleDarkModeChange);

      // Remove the event listener when the component unmounts
      return () => {
        darkModeMediaQuery.removeEventListener("change", handleDarkModeChange);
      };
    }
  }, []);

  useEffect(() => {
    if (isMobileView) {
      setNumberOfColumns(2);
    } else {
      setNumberOfColumns(3);
    }
  }, [isMobileView]);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider
        value={{
          darkMode,
          setDarkMode,
          pageSelected,
          setPageSelected,
          inputValue,
          setInputValue,
          photosOrVideos,
          setPhotosOrVideos,
          searchBarOpen,
          setSearchBarOpen,
          searchBarRef,
          searchObj,
          setSearchObj,
          currentCollTitle,
          setCurrentCollTitle,
          savedMedia,
          setSavedMedia,
          mobMenuOpen,
          setMobMenuOpen,
          mobSearchBar,
          setMobSearchBar,
          isMobileView,
          favoritePhotosOrVideos,
          setFavoritePhotosOrVideos,
          numberOfColumns,
        }}
      >
        <div
          data-theme={darkMode ? "dark" : "light"}
          className={`App bg-[var(--background)] flex flex-col ${
            pageSelected === "Details"
              ? "md:w-full"
              : "md:pl-[280px] 2xl:pl-[400px]"
          } justify-end min-h-screen w-full`}
        >
          <Header />
          {mobMenuOpen && <Navigation />}

          <main
            className={`lg:px-8 px-4 bg-[var(--background)] ${
              isMobileView && pageSelected !== "Details" ? "mt-24" : null
            }  flex flex-col gap-4 flex-grow`}
          >
            <Routes>
              <Route exact path="/media/" element={<Photos />}>
                <Route path="photos/curated" element={<CuratedPhotos />} />
                <Route path="photo/:id" element={<PhotoDetails />} />
                <Route path="video/:id" element={<VideDetails />} />
                <Route path="collection/:id" element={<CollectionDetails />} />
                <Route
                  path="collections/featured"
                  element={<AllCollections />}
                />
                <Route path="favorites" element={<Favorites />} />
                <Route path="photos/:id" element={<SearchPhotos />} />
                <Route path="videos/popular" element={<AllPopular />} />
                <Route path="videos/:id" element={<SearchVideos />} />
              </Route>
              <Route exact path="/" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
