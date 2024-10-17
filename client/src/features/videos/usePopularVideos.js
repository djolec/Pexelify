import { useInfiniteQuery } from "@tanstack/react-query";
import { curatedPhotos } from "../../services/apiPhotos";
import { BASE_URL } from "../../services/axios";

const usePopularVideos = () => {
  return useInfiniteQuery({
    queryKey: ["popular videos"],
    queryFn: (pageParam) => curatedPhotos(pageParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialPageParam: `${BASE_URL}videos/popular?page=1&per_page=30`,
    getNextPageParam: (lastPage) => lastPage.data.next_page,
  });
};

export default usePopularVideos;
