import { useMutation } from "@tanstack/react-query";
import { apiDeleteUser } from "../../services/apiAuth";

const useDeleteUser = () => {
  const { mutate: deleteUser } = useMutation({
    mutationFn: ({ username }) => apiDeleteUser({ username }),
  });

  return { deleteUser };
};

export default useDeleteUser;
