import { useQuery } from "@tanstack/react-query";
import { homepageVideos } from "../../services/apiVideos";

const useHomepageVideos = () => {
  return useQuery({
    queryKey: ["homepage videos"],
    queryFn: homepageVideos,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useHomepageVideos;
