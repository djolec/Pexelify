import { useMutation } from "@tanstack/react-query";
import { apiRegister } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import useSendOTP from "./useSendOTP";
import toast from "react-hot-toast";

const useRegister = () => {
  const navigate = useNavigate();
  const { sendOTP } = useSendOTP();

  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: ({ username, password }) => apiRegister({ username, password }),
    onSuccess: (data) => {
      toast.success(data.data.success);
      sendOTP(data.data.username);
      navigate("/verify", { state: { email: data.data.username } });
    },
    onError: (err) => {
      // console.log(err);
      toast.error(err?.response?.data?.error);
    },
  });

  return { register, isRegistering };
};

export default useRegister;
