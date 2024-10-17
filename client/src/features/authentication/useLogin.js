import { useMutation } from "@tanstack/react-query";
import { apiLogin } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setAuth } = useAuth();

  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ username, password }) => apiLogin({ username, password }),
    onSuccess: (data, { username }) => {
      setAuth({
        username,
        accessToken: data.data.accessToken,
        media: data.data.media,
        history: data.data.history,
      });
      navigate(location?.state?.from?.pathname || "/homepage", {
        replace: true,
      });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error(err?.response?.data?.error || err?.message);
    },
  });

  return { login, isPending };
};

export default useLogin;
