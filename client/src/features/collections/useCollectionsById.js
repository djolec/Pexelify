import { useInfiniteQuery } from "@tanstack/react-query";
import { collectionByID } from "../../services/apiCollections";

const useFeaturedCollections = (id) => {
  return useInfiniteQuery({
    queryKey: ["collection", id],
    queryFn: (pageParam) => collectionByID(pageParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialPageParam: `v1/collections/${id}?page=1&per_page=27`,
    getNextPageParam: (lastPage) => lastPage.data.next_page,
  });
};

export default useFeaturedCollections;
