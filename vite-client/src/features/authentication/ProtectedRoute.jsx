import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth?.username) navigate("/login");
  }, [auth, navigate]);

  if (!auth?.username) {
    return null;
  }

  return children;
};

export default ProtectedRoute;
