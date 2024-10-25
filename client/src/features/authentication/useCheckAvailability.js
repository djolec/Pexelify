import { useMutation } from "@tanstack/react-query";
import { apiCheckAvailability } from "../../services/apiAuth";

const useCheckAvailability = () => {
  const { mutate: checkAvailability } = useMutation({
    mutationFn: (username) => apiCheckAvailability(username),
    onError: (err) => {
      console.log(err);
    },
  });

  return { checkAvailability };
};

export default useCheckAvailability;
