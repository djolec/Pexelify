import { useQuery } from "@tanstack/react-query";

const useGetCooldown = (key, callback) => {
  return useQuery({
    queryKey: [key, callback],
    queryFn: () => callback(key),
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    retry: false,
  });
};

export default useGetCooldown;
