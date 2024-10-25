import { useMutation } from "@tanstack/react-query";
import { apiSendOTP } from "../../services/apiAuth";
import toast from "react-hot-toast";

const useSendOTP = () => {
  const { mutate: sendOTP, isPending: isSendingOTP } = useMutation({
    mutationFn: (username) => apiSendOTP(username),
    onSuccess: (data) => {
      toast.success(data.data.success);
    },
    onError: (err) => {
      console.log(err);
      if (err.status !== 429) toast.error(err?.response?.data?.error);
    },
  });

  return { sendOTP, isSendingOTP };
};

export default useSendOTP;
