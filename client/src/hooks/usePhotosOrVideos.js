import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const usePhotosOrVideos = () => {
  const [photosOrVideos, setPhotosOrVideos] = useState("photos");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("photos")) {
      setPhotosOrVideos("photos");
    } else if (location.pathname.includes("videos")) {
      setPhotosOrVideos("videos");
    }
  }, [location.pathname]);

  return { photosOrVideos, setPhotosOrVideos };
};

export default usePhotosOrVideos;
