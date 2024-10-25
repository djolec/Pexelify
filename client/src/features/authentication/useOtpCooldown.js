import { useQuery } from "@tanstack/react-query";
import { apiOtpCooldown } from "../../services/apiAuth";

const useOtpCooldown = (username) => {
  return useQuery({
    queryKey: [username],
    queryFn: () => apiOtpCooldown(username),
    refetchOnWindowFocus: true,
    refetchOnMount: false,
    retry: false,
  });
};

export default useOtpCooldown;
