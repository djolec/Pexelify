import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useRegister = () => {
  const navigate = useNavigate();

  const {
    mutate: register,
    isPending,
    isError,
  } = useMutation({
    mutationFn: ({ username, password }) =>
      registerUser({ username, password }),
    onSuccess: (user) => {
      toast.success(
        `User ${user.username} successfully created! You will be redirected to the sign in page.`,
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { register, isPending, isError };
};

export default useRegister;
