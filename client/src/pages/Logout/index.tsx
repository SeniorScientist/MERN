import useNotify from "@/hooks/useNotify";
import { useAuth } from "@/store/useAuth";
import { useUser } from "@/store/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { notifySuccess } = useNotify();
  const navigate = useNavigate();
  const setIsAuthenticated = useAuth((state) => state.setIsAuthenticated);
  const setUser = useUser((state) => state.setUser);

  useEffect(() => {
    // Clean the localStorage tokens:
    localStorage.removeItem("access_token");

    // Clean the global state related to user and auth:
    setIsAuthenticated(false);
    setUser(null);

    // Navigate to the login page:
    notifySuccess("Logout successfully!");
    navigate("/login");
  }, []);

  return null;
};

export default Logout;