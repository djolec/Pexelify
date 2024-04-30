import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import DesktopNav from "./DesktopNav";
import { Routes, Route, useLocation } from "react-router-dom";
import Favorites from "./Favorites";
import { routes } from "../utils/constants";

const AppComponents = ({ savedMedia, darkMode }) => {
  const location = useLocation();

  return (
    <div
      className={`${
        location.pathname.includes("details")
          ? ""
          : "md:pl-[280px] 2xl:pl-[400px]"
      }  flex min-h-screen flex-col`}
    >
      <Header />
      <DesktopNav />
      <main
        className={`flex flex-grow flex-col items-center gap-4 bg-[var(--background)] px-4 lg:px-8  
        ${location.pathname.includes("details") ? "" : "pt-24"} md:pt-0`}
      >
        <Routes>
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={
                route.savedMedia ? (
                  <Favorites savedMedia={savedMedia} />
                ) : (
                  <route.element />
                )
              }
            />
          ))}
        </Routes>
      </main>
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default AppComponents;
