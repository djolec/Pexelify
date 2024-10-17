import { useQuery } from "@tanstack/react-query";
import { videoByID } from "../../services/apiVideos";

const useVideosById = (id) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => videoByID(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useVideosById;
