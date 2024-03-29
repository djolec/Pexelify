import "./App.css";
import "./theme.css";
import Lenis from "@studio-freight/lenis";
import { useLocation } from "react-router-dom";
import {
  useState,
  useEffect,
  createContext,
  useRef,
  useLayoutEffect,
} from "react";

import {
  Header,
  Navigation,
  Overlay,
  Photos,
  CuratedPhotos,
  PhotoDetails,
  VideDetails,
  CollectionDetails,
  AllCollections,
  Favorites,
  SearchPhotos,
  AllPopular,
  SearchVideos,
  HomePage,
  Footer,
} from "./components";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";

const queryClient = new QueryClient();

export const AppContext = createContext();

function App() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("isDark")) || null,
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
  const [bigScreen, setBigScreen] = useState(false);
  const [numberOfColumns, setNumberOfColumns] = useState(null);

  const searchBarRef = useRef();

  // Checks the window width upon load and adds event listener to handle resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setMobMenuOpen(false);
        setIsMobileView(true);
        setBigScreen(false);
      } else if (window.innerWidth >= 1536) {
        setMobMenuOpen(true);
        setIsMobileView(false);
        setBigScreen(true);
      } else {
        setMobMenuOpen(true);
        setIsMobileView(false);
        setBigScreen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle closing search bar when clicking somewhere on the page
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!searchBarRef.current.contains(event.target)) setSearchBarOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Checks if there is saved media in local storage
  useLayoutEffect(() => {
    if (localStorage.getItem("savedMedia")) {
      setSavedMedia(JSON.parse(localStorage.getItem("savedMedia")));
    } else {
      localStorage.setItem("savedMedia", JSON.stringify([]));
    }
  }, []);

  // Handles dark/light theme upon load
  useLayoutEffect(() => {
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

  // Sets number of columns to be displayed depending on the screen size
  useEffect(() => {
    if (isMobileView) {
      setNumberOfColumns(2);
    } else {
      setNumberOfColumns(3);
      setMobSearchBar(false);
    }
  }, [isMobileView]);

  // Disables scroll when mobile menu is open
  useEffect(() => {
    if (mobMenuOpen && isMobileView) {
      document.body.classList.add("disable-scroll");
    } else {
      document.body.classList.remove("disable-scroll");
    }
    return () => {
      document.body.classList.remove("disable-scroll");
    };
  }, [mobMenuOpen]);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

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
          numberOfColumns,
          bigScreen,
          favoritePhotosOrVideos,
          setFavoritePhotosOrVideos,
        }}
      >
        <div
          data-theme={darkMode ? "dark" : "light"}
          className={`App flex flex-col bg-[var(--background)] ${
            location.pathname.includes("/media/photo/details") ||
            location.pathname.includes("/media/video/details")
              ? "md:w-full"
              : "md:pl-[280px] 2xl:pl-[400px]"
          } min-h-screen w-full justify-end`}
        >
          <Header />
          {mobMenuOpen && <Navigation />}
          {mobMenuOpen && isMobileView && <Overlay />}

          <main
            className={`bg-[var(--background)] px-4 lg:px-8 ${
              isMobileView && pageSelected !== "Details" ? "mt-24" : null
            }  flex flex-grow flex-col gap-4`}
          >
            <Routes>
              <Route exact path="/media/" element={<Photos />}>
                <Route path="photos/curated" element={<CuratedPhotos />} />
                <Route path="photo/details/:id" element={<PhotoDetails />} />
                <Route path="video/details/:id" element={<VideDetails />} />
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
