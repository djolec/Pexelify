import { useState, useEffect } from "react";

export const useNumberOfColumns = (updateMobSearchOpen, updateMobMenuOpen) => {
  const [numberOfColumns, setNumberOfColumns] = useState(
    window.innerWidth < 640 ? 2 : 3,
  );
  const [isMobile, setIsMobile] = useState(
    window.innerWidth < 768 ? true : false,
  );

  useEffect(() => {
    const handleResize = () => {
      setNumberOfColumns(window.innerWidth < 640 ? 2 : 3);
      setIsMobile(window.innerWidth < 768 ? true : false);
      if (window.innerWidth >= 768 && updateMobSearchOpen) {
        updateMobSearchOpen(false);
      }
      if (window.innerWidth >= 768 && updateMobMenuOpen) {
        updateMobMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return { numberOfColumns, isMobile };
};
