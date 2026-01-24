import { useMutation } from "@tanstack/react-query";
import { apiRegister } from "../../services/apiAuth";
import useSendOTP from "./useSendOTP";
import toast from "react-hot-toast";

const useRegister = () => {
  const { sendOTP, isSendingOTP } = useSendOTP();

  const { mutate: register, isPending: isRegistering } = useMutation({
    mutationFn: ({ username, password }) => apiRegister({ username, password }),
    onSuccess: (data) => {
      sendOTP(data.data.username);
    },
    onError: (err) => {
      toast.error(err?.response?.data?.error);
    },
  });

  return { register, isRegistering, isSendingOTP };
};

export default useRegister;
