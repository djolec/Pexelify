import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const { auth, persist } = useAuth();

  useEffect(() => {
    if (!auth?.username && !persist) navigate("/login");
  }, [auth, navigate, persist]);

  if (!auth?.username && !persist) {
    return null;
  }

  return <Outlet />;
};

export default ProtectedRoute;
