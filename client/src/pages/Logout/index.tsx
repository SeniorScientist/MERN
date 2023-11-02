import useNotify from "@/hooks/useNotify";
import API from "@/services/API";
import { useAuth } from "@/store/useAuth";
import { useUser } from "@/store/useUser";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const { notifySuccess } = useNotify();
  const navigate = useNavigate();
  const setIsAuthenticated = useAuth((state) => state.setIsAuthenticated);
  const setUser = useUser((state) => state.setUser);
  const setIsFetching = useUser((state) => state.setIsFetching);

  useEffect(() => {
    setIsFetching(true);

    API.post('/auth/logout').then((res) => {
      // Clean the global state related to user and auth:
      setIsAuthenticated(false);
      setUser(null);

      // Navigate to the login page:
      notifySuccess("Logout successfully!");
      navigate("/login");
    }).catch((err) => {
      console.log(err)
    }).finally(() => {
      setIsFetching(false);
    })

  }, []);

  return null;
};

export default Logout;