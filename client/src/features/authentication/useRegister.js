import { useMutation } from "@tanstack/react-query";
import { apiRegister } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const useRegister = () => {
  const navigate = useNavigate();

  const { mutate: register, isPending } = useMutation({
    mutationFn: ({ username, password }) => apiRegister({ username, password }),
    onSuccess: (data) => {
      toast.success(
        data.data.success + " You will be redirected to the login page."
      );
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err?.response?.data?.error);
    },
  });

  return { register, isPending };
};

export default useRegister;
