import { useInfiniteQuery } from "@tanstack/react-query";
import { collectionByID } from "../../services/apiCollections";
import { BASE_URL } from "../../services/axios";

const useFeaturedCollections = (id) => {
  return useInfiniteQuery({
    queryKey: ["collection", id],
    queryFn: (pageParam) => collectionByID(pageParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    initialPageParam: `${BASE_URL}v1/collections/${id}?page=1&per_page=27`,
    getNextPageParam: (lastPage) => lastPage.data.next_page,
  });
};

export default useFeaturedCollections;
