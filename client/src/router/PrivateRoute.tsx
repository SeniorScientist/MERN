import PrivateLayout from "@/layouts/PrivateLayout";
import API from "@/services/API";
import { useAuth } from "@/store/useAuth";
import { useUser } from "@/store/useUser";

import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const isFetching = useUser((state) => state.isFetching);

  const setIsAuthenticated = useAuth((state) => state.setIsAuthenticated);
  const setIsFetching = useUser((state) => state.setIsFetching);
  const setUser = useUser((state) => state.setUser);

  const hasAccessToken = localStorage.getItem("access_token");

  if (hasAccessToken && !isAuthenticated && !isFetching) {
    setIsFetching(true);

    API.get("/me")
      .then((response) => {
        setUser(response.data);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
    return null;
  }

  if (!isAuthenticated && !isFetching) {
    return <Navigate to="/login" />;
  }

  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  );
};

export default PrivateRoute;