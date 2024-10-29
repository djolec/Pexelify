import { useInfiniteQuery } from "@tanstack/react-query";
import { searchVideos } from "../../services/apiVideos";
import { useSearchParams } from "react-router-dom";

const useSearchVideos = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updatedSearchParams = new URLSearchParams(searchParams);

  if (updatedSearchParams.get("color")) {
    updatedSearchParams.delete("color");
    setSearchParams(updatedSearchParams);
  }

  const query = updatedSearchParams.get("query");

  return useInfiniteQuery({
    queryKey: ["search videos", updatedSearchParams.toString()],
    queryFn: (pageParam) => searchVideos(pageParam),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    enabled: !!query,
    initialPageParam: `videos/search?${updatedSearchParams.toString()}&page=1&per_page=27`,
    getNextPageParam: (lastPage) => lastPage.data.next_page,
  });
};

export default useSearchVideos;
