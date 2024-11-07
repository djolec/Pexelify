import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { serverAxios } from "../../services/axios";
import useRefresh from "./useRefresh";

const useServerAxios = () => {
  const { auth, setAuth } = useAuth();
  const refresh = useRefresh();

  useEffect(() => {
    const requestIntercept = serverAxios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    const responseIntercept = serverAxios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return serverAxios(prevRequest);
        }
        return Promise.reject(error);
      },
    );

    return () => {
      serverAxios.interceptors.request.eject(requestIntercept);
      serverAxios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh, setAuth]);

  return serverAxios;
};

export default useServerAxios;
