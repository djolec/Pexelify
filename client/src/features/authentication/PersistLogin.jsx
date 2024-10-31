import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefresh from "./useRefresh";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefresh();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        // console.error(err);
        // toast.error("")
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [auth?.accessToken, persist, refresh]);

  return (
    <>
      {isLoading ? (
        <div className="h-screen w-full bg-[var(--surface)]" />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
