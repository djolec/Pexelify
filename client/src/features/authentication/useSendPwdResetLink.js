import { useMutation } from "@tanstack/react-query";
import { apiSendPasswordLink } from "../../services/apiAuth";
import toast from "react-hot-toast";

const useSendPwdResetLink = () => {
  const { mutate: sendPasswordLink, isPending: isSendingPasswordLink } =
    useMutation({
      mutationFn: (username) => apiSendPasswordLink(username),
      onSuccess: (data) => {
        toast.success(data?.data?.message);
      },
      onError: (err) => {
        toast.error(err?.response?.data?.error);
      },
    });

  return { sendPasswordLink, isSendingPasswordLink };
};

export default useSendPwdResetLink;
