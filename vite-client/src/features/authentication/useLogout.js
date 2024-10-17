import { useAuth } from "../../context/AuthContext";
import { serverAxios } from "../../services/axios";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      await serverAxios.get("logout");
    } catch (err) {
      console.error(err);
    }
  };

  return logout;
};

export default useLogout;
