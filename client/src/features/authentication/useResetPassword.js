import { useMutation } from "@tanstack/react-query";
import { apiResetPassword } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useResetPassword = () => {
  const navigate = useNavigate();

  const { mutate: resetPassword, isPending: isResetingPassword } = useMutation({
    mutationFn: ({ password, resetToken }) =>
      apiResetPassword({ password, resetToken }),
    onSuccess: (data) => {
      toast.success(data?.data?.message);
      navigate("/login");
    },
    onError: (err) => {
      toast.error(err.response?.data?.error);
    },
  });

  return { resetPassword, isResetingPassword };
};

export default useResetPassword;
