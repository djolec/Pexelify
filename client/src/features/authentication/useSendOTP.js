import { useMutation } from "@tanstack/react-query";
import { apiSendOTP } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useDeleteUser from "./useDeleteUser";

const useSendOTP = (isResend = false) => {
  const { deleteUser } = useDeleteUser();
  const navigate = useNavigate();

  const { mutate: sendOTP, isPending: isSendingOTP } = useMutation({
    mutationFn: (username) => apiSendOTP(username),
    onSuccess: (data, username) => {
      if (isResend) {
        toast.success(`OTP code resent successfully to ${username}!`);
        return;
      }
      toast.success(data.data.success);
      navigate("/verify", { state: { email: username } });
    },
    onError: (err, username) => {
      if (err.status !== 429) {
        deleteUser({ username });
      } else {
        navigate("/verify", { state: { email: username } });
      }
      toast.error(err?.response?.data?.error);
    },
  });

  return { sendOTP, isSendingOTP };
};

export default useSendOTP;
