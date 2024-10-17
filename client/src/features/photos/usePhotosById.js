import { useQuery } from "@tanstack/react-query";
import { photoByID } from "../../services/apiPhotos";

const usePhotosById = (id) => {
  return useQuery({
    queryKey: [id],
    queryFn: () => photoByID(id),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default usePhotosById;
