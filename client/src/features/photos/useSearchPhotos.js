import { useInfiniteQuery } from "@tanstack/react-query";
import { searchPhotos } from "../../services/apiPhotos";
import { useSearchParams } from "react-router-dom";

const useSearchPhotos = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");

  return useInfiniteQuery({
    queryKey: ["search photos", searchParams.toString()],
    queryFn: (pageParam) => searchPhotos(pageParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!query,
    initialPageParam: `v1/search?${searchParams.toString()}&page=1&per_page=27`,
    getNextPageParam: (lastPage) => lastPage.data.next_page,
  });
};

export default useSearchPhotos;
