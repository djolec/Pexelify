import { useQuery } from "@tanstack/react-query";
import { homepageCollections } from "../../services/apiCollections";

const useHomepageCollections = () => {
  return useQuery({
    queryKey: ["homepage collections"],
    queryFn: homepageCollections,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

export default useHomepageCollections;
