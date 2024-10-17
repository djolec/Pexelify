import { useInfiniteQuery } from "@tanstack/react-query";
import { featuredCollections } from "../../services/apiCollections";
import { BASE_URL } from "../../services/axios";

const useFeaturedCollections = () => {
  return useInfiniteQuery({
    queryKey: ["featured collections"],
    queryFn: (pageParam) => featuredCollections(pageParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialPageParam: `${BASE_URL}v1/collections/featured?page=1&per_page=54`,
    getNextPageParam: (lastPage) => lastPage.data.next_page,
  });
};

export default useFeaturedCollections;
