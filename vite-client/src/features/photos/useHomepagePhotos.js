import { useQuery } from "@tanstack/react-query";
import { homepagePhotos } from "../../services/apiPhotos";

const useHomepagePhotos = () => {
  return useQuery({
    queryKey: ["homepage photos"],
    queryFn: homepagePhotos,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useHomepagePhotos;
