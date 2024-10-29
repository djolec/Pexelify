import { useAuth } from "../../context/AuthContext";
import { serverAxios } from "../../services/axios";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await serverAxios.get("logout", { withCredentials: true });
      setAuth({});
      navigate("/login", { replace: true });
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
