import { useInfiniteQuery } from "@tanstack/react-query";
import { curatedPhotos } from "../../services/apiPhotos";
import { BASE_URL } from "../../services/axios";

const useCuratedPhotos = () => {
  return useInfiniteQuery({
    queryKey: ["curated photos"],
    queryFn: (pageParam) => curatedPhotos(pageParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialPageParam: `${BASE_URL}v1/curated?page=1&per_page=27`,
    getNextPageParam: (lastPage) => lastPage.data.next_page,
  });
};

export default useCuratedPhotos;
