import { useMutation } from "@tanstack/react-query";
import { apiVerifyEmail } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useVerify = () => {
  const navigate = useNavigate();

  const { mutate: verifyEmail, isPending: isVerifying } = useMutation({
    mutationFn: (otp) => apiVerifyEmail(otp),
    onSuccess: () => {
      toast.success("Email verified successfully!");
      navigate("/login", {
        replace: true,
      });
    },
    onError: (err) => {
      if (err.response?.data?.verified === true) {
        navigate("/login", {
          replace: true,
        });
      }
      console.log(err);
      toast.error(err.response?.data?.error);
    },
  });

  return { verifyEmail, isVerifying };
};

export default useVerify;
