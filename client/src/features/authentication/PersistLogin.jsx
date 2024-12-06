import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefresh from "./useRefresh";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
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
        <motion.div className="grid h-screen w-full place-content-center bg-[var(--surface)]">
          <motion.img
            initial={{ opacity: 1 }}
            animate={{ scale: 1.4 }}
            transition={{
              repeatType: "reverse",
              repeat: Infinity,
              duration: 1,
            }}
            height="250"
            width="250"
            className="h-16 w-auto 2xl:h-[100px]"
            src="/assets/logos/PexelifyLogo.webp"
            alt="Pexelify logo"
          />
          <motion.p
            initial={{ opacity: 1 }}
            className="mt-2 text-2xl text-[var(--on-surface)]"
          >
            Loading...
          </motion.p>
        </motion.div>
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default PersistLogin;
