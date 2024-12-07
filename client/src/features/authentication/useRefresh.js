import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { serverAxios } from "../../services/axios";

const useRefresh = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const refresh = async () => {
    try {
      const response = await serverAxios.get("refresh", {
        withCredentials: true,
      });

      setAuth((prev) => {
        return {
          ...prev,
          accessToken: response.data.accessToken,
          username: response.data.username,
          media: response.data.media,
          history: response.data.history,
        };
      });

      return response.data.accessToken;
    } catch (err) {
      setAuth({});
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return refresh;
};

export default useRefresh;

// import { useNavigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";
// import { serverAxios } from "../../services/axios";
// import { useCallback } from "react";

// const useRefresh = () => {
//   const { setAuth } = useAuth();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const refresh = useCallback(async () => {
//     try {
//       const response = await serverAxios.get("refresh", {
//         withCredentials: true,
//       });

//       setAuth((prev) => {
//         return {
//           ...prev,
//           accessToken: response.data.accessToken,
//           username: response.data.username,
//           media: response.data.media,
//           history: response.data.history,
//         };
//       });

//       return response.data.accessToken;
//     } catch (err) {
//       console.log(err);
//       setAuth({});
//       navigate("/login", { state: { from: location }, replace: true });
//     }
//   }, [setAuth, navigate, location]);

//   return refresh;
// };

// export default useRefresh;
