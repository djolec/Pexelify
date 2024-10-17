import { useMutation } from "@tanstack/react-query";
import { apiCheckAvailability } from "../../services/apiAuth";

const useCheckAvailability = () => {
  const {
    mutate: checkAvailability,
    isPending,
    data,
    error,
    isError,
  } = useMutation({
    mutationFn: (username) => apiCheckAvailability(username),
    onError: (err) => {
      console.log(err);
    },
  });

  return { checkAvailability, isPending, data, error, isError };
};

export default useCheckAvailability;
